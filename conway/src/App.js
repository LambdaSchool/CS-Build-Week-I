import React, { Component } from 'react';
import './App.css';

import styled from 'styled-components';
import Game from './Components/Game';

const Title = styled.h1`
  width: 100%;
  size: 15px;
  height: 50px;
`;

const Content = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  width: 1000px;
`;

const PresetsContainer = styled.div`
  width: 300px;
  border: 1px solid red;
`;

const Rules = styled.div`
  width: 300px;
  font-weight: bold;
  border: 1px solid red;
`;

const Bullet = styled.li`
  margin-bottom: 10px;
  text-align: left;
`;

const AboutSection = styled.div`
  width: 100%;
`;

const Button = styled.button`
    height: 25px;
    font-size: 20px;
    border-radius: 15px;
    border: 1px solid black
`;

class App extends Component {
  constructor() {
    super();
    this.state = {
      preset: null
    }
  }

  initPreset = e => {
    this.setState({preset: e.target.value});
  }

  render() {


    return (
      <div className="App">
        <Content>
        <Title>Conway's Game of Life</Title>
          <Game preset={this.state.preset}/>
          <PresetsContainer>
            <Button onClick={this.initPreset} value='1'>Preset 1</Button>
            <Button onClick={this.initPreset} value='2'>Preset 2</Button>
            <Button onClick={this.initPreset} value='3'>Preset 3</Button>
          </PresetsContainer>
          <Rules className="Rules">
            <h2>Rules:</h2>
            <ul>
              <Bullet>Any live cell with fewer than two live neighbors dies, as if by underpopulation.</Bullet>
              <Bullet>Any live cell with two or three live neighbors livess on to the next generation.</Bullet>
              <Bullet>Any live cell with more than 3 neighbors dies as if by overpopulation.</Bullet>
              <Bullet>Any dead cell with exactly three live neighbors becomes a live cell, as if by reproduction.</Bullet>
              <Bullet>Cells off the grid are either assumed to be dead, or wrap around to neighbor the next cell on the row below.</Bullet>
            </ul>
          </Rules>
          <AboutSection>
            <h2>About this Algorithm:</h2>
            <p>Explain Conway's Game of Life and its history. Blah blah blah...</p>
            <p>If you would like to learn more about Conway's Game of Life, check out this <a href="https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life">link!</a></p>
          </AboutSection>
        </Content>
      </div>
    );
  }
}

export default App;
