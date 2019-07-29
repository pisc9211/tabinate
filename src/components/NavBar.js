import React from 'react'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'

const NavBar = ({user, signOut, signInWithGoogle}) => {
    let username = user? user.displayName : 'Guest'
    return (
        <Navbar variant="dark" bg="dark">
            <Navbar.Brand href="/">Tabinate</Navbar.Brand>
            <Navbar.Toggle />
            <Navbar.Collapse className="justify-content-start">
                {user ? <Navbar.Text><img alt='user' style={{'width': '25px', 'border-radius': '50%'}} src={user.providerData[0].photoURL} />
                </Navbar.Text> : null }
            </Navbar.Collapse>
            <Nav>
                {user ? <Nav.Link onClick={signOut}>Log Out</Nav.Link> : <Nav.Link onClick={signInWithGoogle}>Log In</Nav.Link>}
            </Nav>
        </Navbar>
    )
}

export default NavBar