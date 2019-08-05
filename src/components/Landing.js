import React from 'react'
import styled from 'styled-components'
import logo from '../images/tabinate.png'

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

const Landing = () => {
    return (
        <Jumbo>   
            <Container>
                <Message>
                    <img src={logo} alt="logo" />
                    <h3>Automate your websites</h3>
                    <p>Don't waste time opening the same websites every day.</p>
                    <p>Tabinate the website and open all at once!</p>
                </Message>
            </Container>        
        </Jumbo>
    )
}

export default Landing