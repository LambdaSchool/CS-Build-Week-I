import React, { Component } from 'react';

import GameBox from './GameBox';
import styled from 'styled-components';

const Container = styled.div`
    width: 362px;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
`;

const Header = styled.h2`
    height: 30px;
    margin-bottom: 10px;
`;

const ButtonContainer = styled.div`
    width: 300px;
    display: flex;
    justify-content: space-between;
    margin-top: 15px;

`;

const Button = styled.button`
    height: 25px;
    font-size: 20px;
    border-radius: 15px;
    border: 1px solid black
`;

class Game extends Component {
    constructor() {
        super();
        this.state = {
            generation: 0,
            clear: false,
            running: false,
            gameOfLife: false,
            interval: null,
            randomize: false
        }
    }


    gameOfLife(running) {
        this.setState({gameOfLife: !this.state.gameOfLife});

        if (running === true) {
            let interval = setInterval(() => {this.setState({generation: this.state.generation + 1})}, 1000);
            this.setState({interval})
        }
        if (running === false) {
            clearInterval(this.state.interval);
        }
    }


    runSimulation = () => {
        this.setState({running: !this.state.running});
        if (this.state.running === false) {
            this.gameOfLife(true);
            document.getElementById("playStopButton").innerHTML = "Stop";
        } else {
            this.gameOfLife(false);
            document.getElementById("playStopButton").innerHTML = "Play";
            this.setState({generation: 0});
        }
    }

    clearButton = () => {
        this.setState({clear: !this.state.clear});
    }

    randomButton = () => {
        this.setState({randomize: !this.state.randomize});
    }


    render() {
        return ( 
            <Container>
                <Header>Generation: {this.state.generation}</Header>
                <GameBox clear={this.state.clear} randomize={this.state.randomize} gameOfLife={this.state.gameOfLife} clearButton={this.clearButton} randomButton={this.randomButton}/>
                <ButtonContainer>
                    <Button id="playStopButton" onClick={this.runSimulation}>Play</Button>
                    <Button onClick={this.randomButton}>Random</Button>
                    <Button onClick={this.clearButton}>Clear</Button>
                </ButtonContainer>
            </Container>
        );
    }
}
 
export default Game;