import React from 'react'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'

const NavBar = () => {
    return (
        <Navbar variant="dark" bg="dark">
            <Navbar.Brand href="/">Tabinate</Navbar.Brand>
            <Navbar.Toggle />
            <Nav>
                <Nav.Link>Home</Nav.Link>
                <Nav.Link>Log In</Nav.Link>
                <Nav.Link>Log Out</Nav.Link>
            </Nav>
            <Navbar.Collapse className="justify-content-end">
                <Navbar.Text>
                Signed in as: <a href="#login">Guest</a>
                </Navbar.Text>
            </Navbar.Collapse>
        </Navbar>
    )
}

export default NavBar