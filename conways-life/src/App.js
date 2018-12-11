import React, { Component } from 'react';
import Cell from './components/cell';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      totalCells: 400,
      grid: [],
      isClickable: true,
      currGen: 0, // current generation of cells
      intervalId: null
    };
  }

  componentDidMount() {
    let grid = [];
    let edgeIndices = []; // array of cells in the first and last columns
    let neighbors = [];
    let rowLength = Math.sqrt(this.state.totalCells);
    edgeIndices.push(0);

    // push edge cells into an array
    for (let i = rowLength - 1; i < this.state.totalCells; i += rowLength) {
      if (i + 1 < this.state.totalCells) {
        edgeIndices.push(i, i + 1);
      } else {
        edgeIndices.push(i);
      }
    }

    // push all cell objects into grid structure
    for (let i = 0; i < this.state.totalCells; i++) {
      grid.push({ isAlive: false, neighbors: [] });
    }

    // give each edge cell an edge property
    for (let i = 0; i < edgeIndices.length; i++) {
      if (i % 2 === 0) {
        grid[edgeIndices[i]].leftEdge = true;
      } else {
        grid[edgeIndices[i]].rightEdge = true;
      }
    }

    // calculate each cell's neighbors
    for (let i = 0; i < this.state.totalCells; i++) {
      if (grid[i].leftEdge) {
        neighbors = [i - 20, i - 19, i + 1, i + 21, i + 20];
        neighbors.forEach(value => {
          if (value >= 0 && value < this.state.totalCells) {
            grid[i].neighbors.push(value);
          }
        });
      } else if (grid[i].rightEdge) {
        neighbors = [i + 20, i + 19, i - 1, i - 21, i - 20];
        neighbors.forEach(value => {
          if (value >= 0 && value < this.state.totalCells) {
            grid[i].neighbors.push(value);
          }
        });
      } else {
        neighbors = [
          i - 20,
          i - 19,
          i + 1,
          i + 21,
          i + 20,
          i + 19,
          i - 1,
          i - 21
        ];
        neighbors.forEach(value => {
          if (value >= 0 && value < this.state.totalCells) {
            grid[i].neighbors.push(value);
          }
        });
      }
    }

    console.log(grid);
    this.setState({ grid: grid });
  }

  // Update the grid upon clicking a cell
  cellClickHandler = id => {
    if (this.state.isClickable) {
      let grid = this.state.grid.slice();
      grid[id].isAlive = !grid[id].isAlive;

      if (this.state.currGen === 0) {
        this.setState({ grid: grid, currGen: 1 });
      } else {
        this.setState({ grid: grid });
      }
    }
  };

  calculateNextGen = () => {
    let grid = this.state.grid.slice();
    let activeNeighbors = 0;
    console.log(this.state);
    console.log(this.state.grid);
    console.log(grid);
    for (let i = 0; i < this.state.totalCells; i++) {
      activeNeighbors = 0;

      for (let j = 0; j < this.state.grid[i].neighbors.length; j++) {
        console.log(
          'cell: ' +
            i +
            'isAlive ' +
            this.state.grid[i].isAlive +
            ' neighbor: ' +
            this.state.grid[i].neighbors[j] +
            ' active: ' +
            this.state.grid[this.state.grid[i].neighbors[j]].isAlive
        );
        if (this.state.grid[this.state.grid[i].neighbors[j]].isAlive) {
          activeNeighbors++;
        }
      }

      if (
        this.state.grid[i].isAlive &&
        (activeNeighbors !== 2 && activeNeighbors !== 3)
      ) {
        //console.log(i + ' ' + activeNeighbors);
        grid[i].isAlive = false;
      } else if (!this.state.grid[i].isAlive && activeNeighbors === 3) {
        grid[i].isAlive = true;
      }
    }
    console.log(this.state);
    this.setState({ grid: grid, currGen: this.state.currGen + 1 });
  };

  playSimulation = () => {
    let intervalId = setInterval(this.calculateNextGen, 2000);
    console.log('play');
    this.setState({
      intervalId: intervalId,
      isClickable: false
    });
  };

  gridResetHandler = () => {
    clearInterval(this.state.intervalId);
    let grid = this.state.grid.slice();

    for (let i = 0; i < this.state.totalCells; i++) {
      grid[i].isAlive = false;
    }

    this.setState({
      grid: grid,
      currGen: 0,
      isClickable: true,
      intervalId: null
    });
  };

  render() {
    console.log(this.state);
    return (
      <div className="App">
        <div className="container">
          <header>Conway's Game of Life</header>
          <h2>Generation #{this.state.currGen}</h2>
          <div className="grid">
            {this.state.grid.map((cell, value) => (
              <Cell
                key={value}
                id={value}
                isAlive={cell.isAlive}
                isClickable={this.state.isClickable}
                cellClickHandler={this.cellClickHandler}
              />
            ))}
          </div>
          <div className="btns">
            <button onClick={this.playSimulation}>Play</button>
            <button>Pause</button>
            <button onClick={this.gridResetHandler}>Reset</button>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
