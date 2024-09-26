import React from 'react';
import styled from 'styled-components'
import './App.css'
import Main from "./components/Main"
import About from "./components/About"
import Footer from './components/Footer'
import { Link, Router } from "@reach/router"

function App() {


  return (
    <div className="App">
      <NavigationWrapper>
        <Header>
          <h1> Conway Game of Life</h1>
        </Header>
        <LinkWraper>
          <StyledLink to="/" className="link" style={{ color: "black" }}>Home</StyledLink>
          <StyledLink to="about" style={{ color: "black" }}>About</StyledLink>
        </LinkWraper>
      </NavigationWrapper>
      <Router>
        <Main path="/" />
        <About path="about" />
      </Router>
      <Footer />

    </div>
  );

}

export default App;


const NavigationWrapper = styled.div`
    background-color:grey;
    align-items: center;
    display: flex;
    height: 33px;
    text-align: center;
    margin-bottom:1rem;
    padding:0.2rem;
    opacity:0.8
    `
const Header = styled.div`
    margin-left:1rem;
    text-align:center;
    width:60%

`
const LinkWraper = styled.div`
    display:flex;
    justify-content:space-around;
    width:28%
`

const StyledLink = styled(Link)`
    margin: 0.5em 0;
    font-family: Helvetica, Arial, sans-serif;
    text-decoration: none;
    a{

      &:hover {
        color: red;
      }
    }
  
`