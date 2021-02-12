import React from 'react';
import logo from './logo-bug.svg';
import Navbar from 'react-bootstrap/Navbar';
import './Header.scss';
import { Container } from 'react-bootstrap';

class Header extends React.Component<any, any> {
    render() {
        return (
            <header className="Header">
                <Container>
                    <Navbar expand="sm" sticky="top">
                        <Navbar.Brand>
                            <a href="/"><img src={logo} alt="Buildpacks" /></a><span>Registry</span>
                        </Navbar.Brand>
                        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    </Navbar>
                </Container>
            </header>
        );
    }
}

export default Header;
