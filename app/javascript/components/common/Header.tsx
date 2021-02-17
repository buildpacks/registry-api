import React from 'react';
import logo from './logo-bug.svg';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import './Header.scss';
import {Container} from 'react-bootstrap';

class Header extends React.Component<any, any> {
    render() {
        return (
            <header className="Header">
                <Navbar expand="sm" sticky="top">
                    <Navbar.Brand>
                        <a href="/"><img src={logo} alt="Buildpacks"/></a><span>Registry</span>
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
                    <Navbar.Collapse>
                        <Nav className="ml-auto">
                            <Nav.Link href="https://buildpacks.io/" rel="nofollow noopener noreferrer"
                                      target="_blank">Home</Nav.Link>
                            <Nav.Link href="https://buildpacks.io/docs/buildpack-author-guide/publish-a-buildpack/"
                                      rel="nofollow noopener noreferrer" target="_blank">Docs</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
            </header>
        );
    }
}

export default Header;
