import './Detail.scss';

import React from 'react';
import Header from '../common/Header';
import Axios, {AxiosResponse} from 'axios';
import {Card, Container, Dropdown, DropdownButton, ListGroup} from 'react-bootstrap';
import GithubIcon from './GitHub-Mark-64px.png';

class Detail extends React.Component<{match: {params: any}}, { buildpack: any }> {
    constructor(props: any) {
        super(props);
        this.state = {
            buildpack: null
        };
    }

    async componentDidMount() {
        const apiHost = process.env.CNB_API_HOST || 'https://cnb-registry-api.herokuapp.com';
        const {ns, name} = this.props.match.params;
        try {
            const response: AxiosResponse = await Axios.get(`${apiHost}/api/v1/buildpacks/${ns}/${name}`);
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

        const versionDropdownVersions = buildpack.versions.map(version => {
            return <Dropdown.Item key={version.version} href={version._link}>{version.version}</Dropdown.Item>
        });

        const supportedStacks = buildpack.latest.stacks.map(stack => {
            return <ListGroup.Item key={stack} className="Buildpack-details-supported-stack-item">{stack}</ListGroup.Item>
        });

        const description = () => {
            // if (!this.state.buildpack.latest.description) {
            //     return null;
            // }

            return <div>
                <Card.Title>
                    Description
                </Card.Title>
                <Card.Text>
                    {this.state.buildpack.latest.description}
                </Card.Text>
            </div>;
        }

        const license = () => {
            // if (!this.state.buildpack.latest.license) {
            //     return null;
            // }

            return <div>
                <Card.Title>
                    License
                </Card.Title>
                <Card.Text>
                    {this.state.buildpack.latest.license}
                </Card.Text>
            </div>;
        }

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
                                    <div>
                                        <span className="Buildpack-name">{buildpack.latest.name}</span>
                                        <a href={buildpack.latest.homepage}><img src={GithubIcon} /></a>
                                    </div>
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
                                {description()}
                                <div>
                                    <Card.Title>
                                        Usage
                                    </Card.Title>
                                    <code>pack build myapp --buildpack {buildpack.latest.namespace}/{buildpack.latest.name}@{buildpack.latest.version}</code>
                                </div>
                                <div className="Buildpack-details-supported-stacks">
                                    <Card.Title>
                                        Supported Stacks
                                        <ListGroup horizontal>
                                            {supportedStacks}
                                        </ListGroup>
                                    </Card.Title>
                                </div>
                                {license()}
                            </div>
                        </Card.Body>
                    </Card>
                </div>
            </div>
        );
    }
}

export default Detail;