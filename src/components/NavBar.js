import React from 'react'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'

const NavBar = ({user, signOut, signInWithGoogle, demoLogIn, updateDemo}) => {
    let handleLogOut = () => {
        if (user && user.uid === 'demouser') {
            updateDemo(null)
        } else {
            signOut()
        }
    }
    return (
        <Navbar variant="dark" bg="dark" style={{flex: '0 1 auto'}}>
            <Navbar.Brand href="/">Tabinate</Navbar.Brand>
            <Navbar.Toggle />
            <Navbar.Collapse className="justify-content-start">
                {user ? <Navbar.Text><img alt='user' style={{'width': '25px', 'borderRadius': '50%'}} src={user.prodiverData ? user.providerData[0].photoURL : user.photoURL} />
                </Navbar.Text> : null }
            </Navbar.Collapse>
            <Nav>
                { user ? null : <Nav.Link onClick={demoLogIn}>Demo</Nav.Link>}
                {user ? <Nav.Link onClick={handleLogOut}>Log Out</Nav.Link> : <Nav.Link onClick={signInWithGoogle}>Log In</Nav.Link>}
            </Nav>
        </Navbar>
    )
}

export default NavBar