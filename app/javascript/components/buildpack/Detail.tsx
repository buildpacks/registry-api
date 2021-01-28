import './Detail.scss';

import React from "react";
import Header from "../common/Header";
import Axios, {AxiosResponse} from "axios";
import {Card, Container, Dropdown, DropdownButton} from "react-bootstrap";

class Detail extends React.Component<{match: {params: any}}, { buildpack: any }> {
    constructor(props: any) {
        super(props);
        this.state = {
            buildpack: null
        };
    }

    async componentDidMount() {
        const {ns, name} = this.props.match.params;
        console.log(ns);
        console.log(name);
        try {
            const response: AxiosResponse = await Axios.get(`https://cnb-registry-api.herokuapp.com/api/v1/buildpacks/${ns}/${name}`);
            if (response.status >= 200 && response.status < 300) {
                this.setState({ buildpack: response.data || {} });
            }
        } catch (error) {
            console.error(error);
        }
    }

    render() {
        const buildpack = this.state.buildpack;
        if (!this.state.buildpack) {
            return null;
        }
        console.log(buildpack);
        const versionDropdownVersions = buildpack.versions.map(version => {
            return <Dropdown.Item href={version._link}>{version.version}</Dropdown.Item>
        });

        console.log(versionDropdownVersions);

        return (
            <div>
                <Header/>
                <div className="Buildpack-header">
                    <Container className="py-3">&nbsp;</Container>
                </div>
                <div className="Buildpack-details">
                    <Card className="Buildpack-Item shadow-sm mb-3">
                        <Card.Body className="text-left">
                            <div className="mb-2">
                                <div>
                                    <span className="Buildpack-Name">{buildpack.latest.name}</span>
                                    <DropdownButton id="dropdown-basic-button" title="versions">
                                        {versionDropdownVersions}
                                    </DropdownButton>
                                </div>

                                <span
                                    className="font-italic text-muted pl-2">{buildpack.latest.version}</span>
                            </div>
                            <div className="d-flex">
                                <div>{buildpack.latest.namespace}</div>
                            </div>
                        </Card.Body>
                    </Card>
                </div>
            </div>
        );
    }
}

export default Detail;