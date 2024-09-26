import React, { Component } from 'react';
import './App.css';
import ButtonContainer from './components/ButtonContainer';
import Grid from './components/Grid';

class App extends Component {
  constructor() {
    super();
    this.rows = 15;
    this.cols = 15;

    this.state = {
      generation: 0,
      speed: 500,
      gridFull: Array(this.rows).fill().map(() => Array(this.cols).fill(false)),
      config1: false,
    }
  }

  handleConfig1 = () => {
    this.setState({
      config1: true
    })
  }

  arrayClone = arr => {
    return JSON.parse(JSON.stringify(arr));
  }

  selectCell = (row, col) => {
		let gridCopy = this.arrayClone(this.state.gridFull);
		gridCopy[row][col] = !gridCopy[row][col];
		this.setState({
			gridFull: gridCopy
		});
  }

  playButton = () => {
		clearInterval(this.intervalId);
		this.intervalId = setInterval(this.play, this.state.speed);
  }
  
  pauseButton = () => {
		clearInterval(this.intervalId);
  }

  increaseSpeed = () => {
    this.setState({
      speed: this.state.speed + 100
    })
  }
  
  decreaseSpeed = () => {
    this.setState({
      speed: this.state.speed - 100
    })
  }

  clearButton = () => {
    var grid = Array(this.rows)
      .fill()
      .map(() => Array(this.cols).fill(false));

		this.setState({
			gridFull: grid,
			generation: 0
		});
  }
  
  play = () => {
		let g = this.state.gridFull;
		let g2 = this.arrayClone(this.state.gridFull);

		for (let i = 0; i < this.rows; i++) {
		  for (let j = 0; j < this.cols; j++) {
		    let count = 0;
		    if (i > 0) if (g[i - 1][j]) count++; 
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
		this.setState({
		  gridFull: g2,
		  generation: this.state.generation + 1
    });
  }
    
  render() {
    console.log("config1 state: ", this.state.config1)
    return (
      <div className="App">
        <header className="App-header">
          <h3>Conway's Game of Life</h3>
        </header>
        <h3 className="center">Generations: {this.state.generation}</h3>
        <h3 className="center">Time Per Generation: {this.state.speed} ms</h3>
        <Grid
          gridFull={this.state.gridFull}
          rows={this.rows}
          cols={this.cols}
          selectCell={this.selectCell}
          config1State={this.state.config1}
        />
        <ButtonContainer 
          playButton={this.playButton}
          pauseButton={this.pauseButton}
          clearButton={this.clearButton}
          increaseSpeed={this.increaseSpeed}
          decreaseSpeed={this.decreaseSpeed}
          speed={this.state.speed}
          handleConfig1={this.handleConfig1}
        />
      </div>
    );
  }
}

export default App;
