import React, { Component } from 'react';
import styled from 'styled-components';
import img from '../Images/finalpixelpls.png';
import img2 from '../Images/newpause.png';
import img1 from '../Images/newestart.png'
import Game from './Game'
import './Game.css'
import '../Hover/hover-min.css';

const Fatherdiv = styled.div`
width: 100%;
height: 100%;
display: flex;
background-image:url(${img});
`
const Header = styled.div`
flex-direction: column;`

const GridOutline = styled.div`
width: 800px;
height: 600px;
border: none;
`
const Welcome = styled.div`
font-family: 'Chakra Petch', sans-serif;
font-size: 48px;
color: #7436b9;
margin-left: 10px;
`
const Clear = styled.button`
cursor: pointer;
text-decoration: none;
background-color: #B416AE;
border: 1px solid #340069;
width: 200px;
height 60px;
font-family: 'Chakra Petch', sans-serif;
color: #FBC36A;
margin-left: 15px;
font-size: 26px;
font-style: italic;
border-radius: 5px;
`
const Learn = styled.button`
cursor: pointer;
text-decoration: none;
width: 200px;
height 60px;
font-family: 'Chakra Petch', sans-serif;
margin-left: 15px;
font-size: 26px;
font-style: italic;
border-radius: 5px;
background-color: #EF5656;
border: none;


`

class Main extends Component {

    reloader = () => {
        window.location.reload()
    }
    render() {
        return (
            <Fatherdiv>
                

            <GridOutline>
                <Game/>
                </GridOutline>
            
            <Header>
            <Welcome>
                    Welcome to Conway's <br/>Game of Life
                    </Welcome>
                   <a class="button hvr-skew-backward">
                <Clear onClick={() => this.reloader()}> Clear Board</Clear>
                </a>

                <a target="_blank" href="https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life"class="button hvr-rotate">
                <Learn > Learn More</Learn>
            </a>
                </Header>

            </Fatherdiv>

        )
    }
}

export default Main;