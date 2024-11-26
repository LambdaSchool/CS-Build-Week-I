import React, { Component } from 'react';
import Grid from "./Components/Grid";
import Styled from 'styled-components';
import Rules from "./Components/Rules";
import About from "./Components/About";
import { MenuItem, DropdownButton } from 'react-bootstrap';
import Head from './Components/Head';

const Container = Styled.div`
  display: flex; 
`;

const Gameboard = Styled.div `
  display: flex;
  margin: 50px;
  left: 20px;
`;

const Header = Styled.h2 `
  text-align: center;
  font-family: 'VT323', monospace;
  font-size: 48px;
`;

const Button = Styled.button`
  height: 30px;
  width: 100px;
`;

const ButtonContainer = Styled.div`
  display: flex;
  flex-direction: column;
`;

const Sidebar_Outer = Styled.div `
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  width: 20%;
  margin: 50px;
`;

const Sidebar_Inner = Styled.div `
display: flex;
flex-direction: column;
justify-content: space-around;
align-items: center;
position: absolute;
top: 200px;
height: 400px;
`;

const Window = Styled.div `
  display: flex;
  flex-direction: column;
`;

const Gens = Styled.div `
  font-size: 24px;
  font-weight: bold;
`;


class App extends Component {
  constructor(){
    super();
    this.speed = 100;
    this.rows = 20;
    this.cols = 20;
    this.state = {
      currentGen: 0,
      gridFull: Array(this.rows).fill().map(() => Array(this.cols).fill(false)),
      displayRules: false,
      displayAbout: false
    }
  }
  //selects individual cell
  selectBox = (row, col) => {
    let grid = arrayClone(this.state.gridFull);
    grid[row][col] = !grid[row][col];
		this.setState({gridFull: grid});
  }

  //toggles rules when button is clicked
  toggleRules = () => {
    this.setState({displayRules: !this.state.displayRules})
  }

  //toggles about when button is clicked
  toggleAbout = () => {
    this.setState({displayAbout: !this.state.displayAbout})
  }

  //adjusts size of grid
  handleSize = (evt) => {
    this.gridSize(evt);
  }

  //fills in random cells on grid
  seedGrid = () => {
    let grid = arrayClone(this.state.gridFull);
    for(let i = 0; i < this.rows; i++) {
      for(let j=0; j< this.cols; j++) {
        if(Math.floor(Math.random() * 4) === 1) {
          grid[i][j] = true;
        }
      }
    }
    this.setState({gridFull: grid});
  }

  //animates grid according to rules
  play = () => {
    let g = this.state.gridFull;
    let g2 = arrayClone(this.state.gridFull);

    for(let i = 0; i < this.rows; i++) {
      for(let j=0; j< this.cols; j++) {
        let count = 0;
            if (i > 0) if(g[i-1][j]) count++;
            if (i > 0 && j > 0) if (g[i - 1][j - 1]) count++;
            if (i > 0 && j < this.cols - 1) if (g[i - 1][j + 1]) count++;
            if (j < this.cols - 1) if (g[i][j + 1]) count++;
            if (j > 0) if (g[i][j - 1]) count++;
            if (i < this.rows - 1) if (g[i + 1][j]) count++;
            if (i < this.rows - 1 && j > 0) if (g[i + 1][j - 1]) count++;
            if (i < this.rows - 1 && j < this.cols - 1) if (g[i + 1][j + 1]) count++;
            if (g[i][j] && (count < 2 || count > 3)) g2[i][j] = false;
            if (!g[i][j] && count === 3) g2[i][j] = true;
      }
    }
    this.setState({gridFull: g2, currentGen: this.state.currentGen+1});
  }
   
  startGame = () => {
    clearInterval(this.intervalId);
    this.intervalId = setInterval(this.play, this.speed)
    this.play();
  }

  stopGame =() => {
    clearInterval(this.intervalId);
  }

  clearGrid = () => {
    let grid = Array(this.rows).fill().map(() => Array(this.cols).fill(false));
    this.setState({gridFull: grid, currentGen: 0})
  }

  //decreases speed by half
  slowSpeed = () => {
		this.speed = this.speed * 2;
		this.startGame();
  }
  
  //doubles speed
  fastSpeed = () => {
		this.speed = this.speed / 2;
		this.startGame();
	}

  gridSize = (size) => {
    switch(size) {
      case "1":
				this.cols = 20;
				this.rows = 20;
			break;
			case "2":
				this.cols = 30;
				this.rows = 30;
			break;
			default:
				this.cols = 40;
				this.rows = 40;
		}
		this.clearGrid();
  }

  render() {
    return (
      <Window >
        <div style={{height: '100px', backgroundColor: 'orange'}}>
        <Header>Game of Life</Header>
        <Head selectBox={this.selectBox}/>
        </div>
        <Container>
          <Sidebar_Outer>
          <Sidebar_Inner>
          <ButtonContainer>
            <Button onClick={this.toggleRules}>
						  Rules
              {this.state.displayRules ? <Rules toggleRules={this.toggleRules}/> : null}
					  </Button>
            <Button onClick={this.toggleAbout}>
              About
              {this.state.displayAbout ? <About toggleAbout={this.toggleAbout}/> : null}
            </Button>
            </ButtonContainer>
            <div><Gens>Current: {this.state.currentGen}</Gens></div>
            <ButtonContainer>					
              <Button onClick={this.startGame}>Start</Button>
              <Button onClick={this.stopGame}>Stop</Button>
              <Button onClick={this.clearGrid}>Clear</Button>
              <Button onClick={this.seedGrid}>Seed</Button>
              <Button onClick={this.fastSpeed}>Faster</Button>
              <Button onClick={this.slowSpeed}>Slower</Button>
              <DropdownButton
						    title="Grid Size"
						    id="size-menu"
                onSelect={this.handleSize}
					    >
						    <MenuItem eventKey="1">20x20</MenuItem>
						    <MenuItem eventKey="2">30x30</MenuItem>
						    <MenuItem eventKey="3">40x40</MenuItem>
					  </DropdownButton>
            </ButtonContainer>
            </Sidebar_Inner>
          </Sidebar_Outer>
          

          <Gameboard>
            <Grid clearGrid={this.clearGrid}  
              cols={this.cols} 
              rows={this.rows}
              gridFull={this.state.gridFull}
              selectBox={this.selectBox}/>
          </Gameboard>
        </Container>
      </Window>
    );
  }

  
}

function arrayClone (arr) {
  return JSON.parse(JSON.stringify(arr));
}

export default App;
