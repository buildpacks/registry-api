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
            return <Dropdown.Item key={version.version} href={version._link}>{version.version}</Dropdown.Item>
        });

        const supportedStacks = buildpack.latest.stacks.map(stack => {
            return <Card key={stack} className="Buildpack-details-stacks shadow-sm"><Card.Subtitle>{stack}</Card.Subtitle></Card>
        });

        return (
            <div>
                <Header/>
                <div className="Buildpack-header">
                    <Container className="py-3">&nbsp;</Container>
                </div>
                <div className="Buildpack-details">
                    <Card className="Buildpack-item shadow-sm mb-3">
                        <Card.Body className="text-left">
                            <div className="mb-2">
                                <div className="Buildpack-card-header">
                                    <span className="Buildpack-name">{buildpack.latest.name}</span>
                                    <DropdownButton id="dropdown-basic-button" title="versions">
                                        {versionDropdownVersions}
                                    </DropdownButton>
                                </div>
                                <span className="font-italic text-muted pl-2">{buildpack.latest.version}</span>
                            </div>
                            <div className="d-flex">
                                <div>{buildpack.latest.namespace}</div>
                            </div>
                            <hr/>
                            <div className="Buildpack-details-meta">
                                <div>
                                    <Card.Title>
                                        Usage
                                    </Card.Title>
                                    <code>pack build myapp --buildpack {buildpack.latest.namespace}/{buildpack.latest.name}</code>
                                </div>
                                <div>
                                    <Card.Title>
                                        Supported Stacks
                                        <div>
                                            {supportedStacks}
                                        </div>
                                    </Card.Title>
                                </div>
                            </div>
                        </Card.Body>
                    </Card>
                </div>
            </div>
        );
    }
}

export default Detail;