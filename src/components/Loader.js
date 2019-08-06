import React from 'react'
import styled from 'styled-components'

const Spinner = styled.div`
  position: relative;
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;

  .ball {
    height: 50px;
    width: 50px;
    margin: 10px;
    border-radius: 50%;
    transform: scale(.2);
  }

  .one {
    background-Color: red;
    animation: grow 1s linear 0s infinite alternate;
  }

  .two {
    background-Color: green;
    animation: grow 1s linear .3s infinite alternate;
  }

  .three {
    background-Color: blue;
    animation: grow 1s linear .6s infinite alternate;
  }

  @keyframes grow {
    from {transform: scale(0.2)}
    to {transform: scale(1)}
  }
`

const Loader = () => (
  <Spinner>
    <div className="ball one"></div>
    <div className="ball two"></div>
    <div className="ball three"></div>
  </Spinner>
)

export default Loader