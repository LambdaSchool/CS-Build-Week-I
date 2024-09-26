import React, { Component } from 'react';
import Main from './Components/Main';
import styled from 'styled-components';
import img from './Images/finalpixelpls.png'


const Appbox = styled.div`
background-image:url(${img});
height: 1080px;
width: 1920px;
`

class App extends Component {
  render() {
    return (
      <Appbox>
        <Main/>
      </Appbox>
    );
  }
}

export default App;
