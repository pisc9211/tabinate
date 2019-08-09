import React from 'react'
import styled from 'styled-components'
import logo from '../images/tabinate.png'
import signIn from '../images/btn_google_signin_dark_normal_web.png'

const Jumbo = styled.div`
    display: flex;
    margin: 0;
    padding: 0;
    flex-grow: 1;
`

const Container = styled.div`
    text-align: center;
    background: linear-gradient(0.25turn, #3f87a6, #f69d3c);
    padding: 0;
    flex: 1 1 auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
    color: #333
`

const Message = styled.div`
    self-align: center;
`

const GoogleSignIn = styled.a`
`

const Landing = ({signInWithGoogle}) => {
    return (
        <Jumbo>   
            <Container>
                <Message>
                    <img src={logo} alt="logo" />
                    <h3>Automate your websites</h3>
                    <p>Don't waste time opening the same websites every day.</p>
                    <p>Lets get started: </p>
                    <a onClick={signInWithGoogle} href="/">
                        <img 
                            src={signIn} 
                            alt="logo" 
                        />
                    </a>
                </Message>
            </Container>        
        </Jumbo>
    )
}

export default Landing