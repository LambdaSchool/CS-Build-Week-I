import React, { Component } from 'react';
import './App.css';
// import ReactCanvas from 'react-canvas';
import Grid from './Components/Grid';
import Presets from './Components/Presets';
import Buttons from './Components/Buttons';
class App extends Component {
  constructor() {
    super();
    this.speed= 100;
    this.rows= 20;
    this.columns=20;
    this.state={
      generation:0,
      gridFull: Array(this.rows).fill().map(()=> Array(this.columns).fill(false))
    }
  }

  selectBox= (rows,columns) => {
    let gridCopy= arrayClone(this.state.gridFull);
    gridCopy[rows][columns] = !gridCopy[rows][columns];
    this.setState({
      gridFull:gridCopy
    })
  }

  clear= () => {
    var grid = Array(this.rows).fill().map(() => Array(this.cols).fill(false));
		this.setState({
			gridFull: grid,
			generation: 0
		});
  }

  pause = () => {
		clearInterval(this.intervalId);
	}

  randomize= (clear) => {
    //this.clear();
    let gridCopy =arrayClone(this.state.gridFull);
    for (let i =0; i<this.rows; i++) {
      for (let j=0; j<this.columns; j++) {
        if (Math.floor(Math.random()*4)===1) {
          gridCopy[i][j]= true;
        }
      }
    }
    this.setState({
      gridFull: gridCopy
    });
  }

  playButton = () => {
		clearInterval(this.intervalId);
		this.intervalId = setInterval(this.play, this.speed);
	}

  play = () => {
		let g = this.state.gridFull;
		let g2 = arrayClone(this.state.gridFull);

		for (let i = 0; i < this.rows; i++) {
		  for (let j = 0; j < this.columns; j++) {
		    let count = 0;
		    if (i > 0) if (g[i - 1][j]) count++;
		    if (i > 0 && j > 0) if (g[i - 1][j - 1]) count++;
		    if (i > 0 && j < this.columns - 1) if (g[i - 1][j + 1]) count++;
		    if (j < this.columns - 1) if (g[i][j + 1]) count++;
		    if (j > 0) if (g[i][j - 1]) count++;
		    if (i < this.rows - 1) if (g[i + 1][j]) count++;
		    if (i < this.rows - 1 && j > 0) if (g[i + 1][j - 1]) count++;
		    if (i < this.rows - 1 && j < this.columns - 1) if (g[i + 1][j + 1]) count++;
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
    return (
      <div className="App">
        <div className="Top">
          <Grid 
            gridFull={this.state.gridFull}
            rows={this.rows}
            columns={this.columns} 
            selectBox={this.selectBox}
          />
          <Presets
            randomize={this.randomize}
          />
        </div>
        <Buttons 
          clear= {this.clear}
          play= {this.playButton}
          pause= {this.pause}
        />
        <h2> Generations: {this.state.generation} </h2>
      </div>
    );
  }
}

function arrayClone(arr) {
  return JSON.parse(JSON.stringify(arr));
}

export default App;
