import React from 'react';
import './App.scss';
import { Button, Card, CardDeck, Col, Container, Image, Jumbotron, Row } from 'react-bootstrap';
import logo from "./logo-light.png";
import searchIcon from "./search.svg";
import versionIcon from "./versioning-02.svg"
import checkIcon from "./check-03.svg";
import Header from "./common/Header";
import Search from "./search/Search";
import Footer from "./common/Footer";


class App extends React.Component<{ match: { params: any } }> {
    render() {
        const { sL } = this.props.match.params;

        return (
            <div className="App">
                <Header />
                <Search />
                <Jumbotron fluid>
                    <Container>
                        <h2>Buildpack Registry</h2>
                        <p>
                            Centralized registry for community buildpacks
                        </p>
                    </Container>
                </Jumbotron>
                <Container className='my-5'>
                    <Row className="align-items-start">
                        <Col md="8" lg="8">
                            <p className='text-left'>
                                <i>The Buildpack Registry</i> is a comprehensive collection of submitted buildpacks. A central <b>ecosystem</b> used to interact with buildpacks and discover details such as supported stacks, licensing, contributor information, and <b>versioning</b>.
                            </p>
                            <p className='text-left'>
                                Join the community and find out how to help. <a href='https://slack.buildpacks.io/'>Reach out</a> on Slack to learn how!
                            </p>
                        </Col>
                        <Col md="4" lg="4" className="d-flex justify-content-center align-items-center" >
                            <Image src={logo} fluid
                                style={{
                                    width: 'auto',
                                    height: '100%',
                                    maxHeight: '250px',
                                    padding: '0',
                                    margin: '0',
                                    position: 'relative',
                                    bottom: '80px'
                                }}
                            />
                        </Col>
                    </Row>
                </Container>
                <Container>
                    <Row>
                        <CardDeck>
                            <Card style={{ border: 'none' }}>
                                <Card.Title className='my-2'>Discovery</Card.Title>
                                <Card.Img
                                    variant="top"
                                    className="mx-auto p-4"
                                    src={searchIcon}
                                    style={{
                                        maxWidth: '150px',
                                        height: 'auto',
                                        objectFit: 'contain'
                                    }}
                                />
                                <Card.Body>
                                    <Card.Text>
                                        Searchable compendium of community published buildpacks
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                            <Card style={{ border: 'none' }}>
                                <Card.Title className='my-2'>Versioning</Card.Title>
                                <Card.Img
                                    variant="top"
                                    className="mx-auto p-4"
                                    src={versionIcon}
                                    style={{
                                        maxWidth: '150px',
                                        height: 'auto',
                                        objectFit: 'contain'
                                    }}
                                />
                                <Card.Body>
                                    <Card.Text>
                                        Track a buildpack's available versions
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                            <Card style={{ border: 'none' }}>
                                <Card.Title className='my-2'>Compatibility</Card.Title>
                                <Card.Img
                                    variant="top"
                                    className="mx-auto p-4"
                                    src={checkIcon}
                                    style={{
                                        maxWidth: '150px',
                                        height: 'auto',
                                        objectFit: 'contain'
                                    }}
                                />
                                <Card.Body>
                                    <Card.Text>
                                        Inspect a buildpack’s supported stacks and requirements
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </CardDeck>
                    </Row>

                </Container>
                <Footer />
            </div>
        );
    }
}

export default App;
