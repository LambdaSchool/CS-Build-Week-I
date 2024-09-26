import React from "react";
import ReactDOM from "react-dom";
import Grid from "./components/Grid.js";
import Buttons from "./components/Buttons.js";
import "./index.css";

class MainPage extends React.Component {
  constructor() {
    super();
    this.speed = 100;
    this.rows = 30;
    this.cols = 50;
    this.state = {
      generation: 0,
      gridFull: Array(this.rows)
        .fill()
        .map(() => Array(this.cols).fill(false))
    };
  }

  selectBox = (row, col) => {
    let gridCopy = arrayClone(this.state.gridFull);
    gridCopy[row][col] = !gridCopy[row][col];
    this.setState({
      gridFull: gridCopy
    });
  };

  seed = () => {
    let gridCopy = arrayClone(this.state.gridFull);
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.cols; j++) {
        if (Math.floor(Math.random() * 4) === 1) {
          gridCopy[1][j] = true;
        }
      }
    }
    this.setState({ gridFull: gridCopy });
  };

  //every 100 milliseconds we call play.
  startButton = () => {
    clearInterval(this.intervalId);
    this.intervalId = setInterval(this.play, this.speed);
  };

  stopButton = () => {
    clearInterval(this.intervalId);
  };

  slow = () => {
    this.speed = 1000;
    this.startButton();
  };
//start speed set to fast at 100ms
  fast = () => {
    this.speed = 100;
    this.startButton();
  };

  clear = () => {
    let grid = Array(this.rows)
      .fill()
      .map(() => Array(this.cols).fill(false));
    this.setState({
      gridFull: grid,
      generation: 0
    });
  };

  gridSize = size => {
    switch (size) {
      case "1":
        this.cols = 30;
        this.rows = 20;
        break;
      case "2":
        this.cols = 60;
        this.rows = 40;
        break;
      default:
        this.cols = 80;
        this.rows = 60;
    }
    this.clear();
  };

  play = () => {
    let g = this.state.gridFull;
    let g2 = arrayClone(this.state.gridFull);
// Algorithm for cells to multiply assuming last two (if) rules at the bottom are met.
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
        if (i < this.rows - 1 && this.cols - 1) if (g[i + 1][j + 1]) count++;
        // 2 Rules
        if (g[i][j] && (count < 2 || count > 3)) g2[i][j] = false; //if cell is alive and it has less than 2 or more than 3 neighbors alive.  else it dies.
        if (!g[i][j] && count === 3) g2[i][j] = true; //If the cell is dead and has exactly 3 neighbors,cell lives
      }
    }
    this.setState({
      gridFull: g2,
      generation: this.state.generation + 1
    });
  };
// once page loads.  seed goes on to create pattern
  componentDidMount() {
    this.seed();
    this.startButton();
  }

  render() {
    return <div>
        <h1> Conway's Game of Life and Death </h1>
        <Buttons startButton={this.startButton} stopButton={this.stopButton} slow={this.slow} fast={this.fast} clear={this.clear} seed={this.seed} gridSize={this.gridSize} />

        <Grid gridFull={this.state.gridFull} rows={this.rows} cols={this.cols} selectBox={this.selectBox} />
        <h2>Generations Created: {this.state.generation}</h2>
      
        <h2>
          RULES: (A) Cell is alive and it has less than 2 or more than 3
          neighbors alive. else it dies. (B) If the cell is dead and has
          exactly 3 neighbors,cell lives.
        </h2>
      </div>;
  }
}

// stringify will make a clone of the arrays inside the arrays
//allows for boxes to be made
function arrayClone(arr) {
  return JSON.parse(JSON.stringify(arr));
}

ReactDOM.render(<MainPage />, document.getElementById("root"));


