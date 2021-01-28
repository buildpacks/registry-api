import React from "react";
import Header from "../common/Header";
import Search from "../search/Search";
import {Link} from "react-router-dom";
import Axios, {AxiosResponse} from "axios";
import {Card, Dropdown, DropdownButton} from "react-bootstrap";

class Buildpack extends React.Component<{match: {params: any}}, { buildpack: any }> {
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
        return (
            <div className="">
                <Header />
                <Card className="Buildpack-Item shadow-sm mb-3">
                    <Card.Body className="text-left">
                        <div className="mb-2">
                            <div>
                                <span className="Buildpack-Name">{buildpack.latest.name}</span>
                                <DropdownButton id="dropdown-basic-button" title="Dropdown button">
                                    <Dropdown.Item href="#/action-1">1.4</Dropdown.Item>
                                    <Dropdown.Item href="#/action-2">1.3</Dropdown.Item>
                                    <Dropdown.Item href="#/action-3">1.2</Dropdown.Item>
                                </DropdownButton>
                            </div>

                            <span className="Buildpack-Version font-italic text-muted pl-2">{buildpack.latest.version}</span>
                        </div>
                        <div className="d-flex">
                            <div className="Buildpack-Namespace">{buildpack.latest.namespace}</div>
                        </div>
                    </Card.Body>
                </Card>
            </div>
        );
    }
}

export default Buildpack;