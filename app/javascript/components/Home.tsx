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


class App extends React.Component<{match: {params: any}}>{
    render(){
        const {sL} = this.props.match.params;
        
    return (
        <div className="App">
            <Header />
            <Search />
            <Jumbotron fluid>
                <Container>
                    <h1>Buildpack Registry</h1>
                    <p>
                        Centralized registry for community buildpacks
                    </p>
                </Container>
            </Jumbotron>
            <Container className='my-5'>
                <Row>
                    <Col md="8">
                        <p className='text-left'>
                            <i>The Buildpack Registry</i> is a comprehensive collection of submitted buildpacks.  A central <b>ecosystem</b> used to interact with buildpacks and discover details such as supported stacks, licensing, contributor information and <b>versioning</b>.
                        </p>
                        <p className='text-left'>
                            Join the community and find out how to help. <a href='https://slack.buildpacks.io/'>Reach out</a> on slack to learn how!
                        </p>
                    </Col>
                    <Col md="4">
                        <Image src={logo} fluid />
                    </Col>
                </Row>
            </Container>
            <Container>
                <Row>
                    <CardDeck>
                        <Card style={{border: 'none'}}>
                            <Card.Title className='my-2'>Discovery</Card.Title>
                            <Card.Img variant="top" className="mx-auto p-4" src={searchIcon} />
                            <Card.Body>
                                <Card.Text>
                                    Searchable compendium of community published buildpacks
                                </Card.Text>
                            </Card.Body>
                        </Card>
                        <Card style={{border: 'none'}}>
                            <Card.Title className='my-2'>Versioning</Card.Title>
                            <Card.Img variant="top" className="mx-auto p-4" src={versionIcon} />
                            <Card.Body>
                                <Card.Text>
                                    Track a buildpack's available versions
                                </Card.Text>
                            </Card.Body>
                        </Card>
                        <Card style={{border: 'none'}}>
                            <Card.Title className='my-2'>Compatability</Card.Title>
                            <Card.Img variant="top" className="mx-auto p-4" src={checkIcon} />
                            <Card.Body>
                                <Card.Text>
                                    Inspect a builpack’s supported stacks and requirements
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </CardDeck>
                </Row>
            </Container>
            <Footer />
        </div>
    );}
}

export default App;
