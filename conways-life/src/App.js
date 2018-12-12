import React, { Component } from 'react';
import Cell from './components/cell';
import './App.scss';

class App extends Component {
  constructor(props) {
    super(props);
    this.intervalId = null;
    this.bornColor = '#13f252';
    this.liveColor = '#f4fc00';
    this.deadColor = '#423636';
    this.emptyColor = 'white';

    this.state = {
      totalCells: 400,
      grid: [],
      isClickable: true,
      currGen: 0, // current generation of cells
      speed: 1500, // in milliseconds
      deadCells: 0,
      bornCells: 0,
      totalLiveCells: 0
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
      grid.push({ isAlive: false, neighbors: [], color: this.emptyColor });
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
    let bornCells = this.state.bornCells;
    let deadCells = this.state.deadCells;
    let totalLiveCells = this.state.totalLiveCells;

    if (this.state.isClickable) {
      let grid = [];

      this.state.grid.forEach(cell => {
        grid.push({ ...cell });
      });

      if (grid[id].isAlive && grid[id].color === this.bornColor) {
        grid[id].color = this.liveColor;
        bornCells--;
      } else if (grid[id].isAlive && grid[id].color === this.liveColor) {
        grid[id].isAlive = !grid[id].isAlive;
        grid[id].color = this.deadColor;
        deadCells++;
        totalLiveCells--;
      } else if (!grid[id].isAlive && grid[id].color === this.deadColor) {
        grid[id].color = this.emptyColor;
      } else {
        grid[id].isAlive = !grid[id].isAlive;
        grid[id].color = this.bornColor;
        bornCells++;
        totalLiveCells++;
      }

      if (this.state.currGen === 0) {
        this.setState({
          grid: grid,
          currGen: 1,
          bornCells: bornCells,
          deadCells: deadCells,
          totalLiveCells: totalLiveCells
        });
      } else {
        this.setState({
          grid: grid,
          bornCells: bornCells,
          deadCells: deadCells,
          totalLiveCells: totalLiveCells
        });
      }
    }
  };

  randomGridHandler = () => {
    let grid = [];
    let randomNum = null;
    let bornCells = 0;
    let totalLiveCells = 0;

    this.state.grid.forEach(cell => {
      grid.push({ ...cell });
    });

    for (let i = 0; i < this.state.totalCells; i++) {
      randomNum = Math.floor(Math.random() * Math.floor(5));
      grid[i].isAlive = randomNum === 0 ? true : false;
      if (grid[i].isAlive) {
        grid[i].color = this.bornColor;
        bornCells++;
        totalLiveCells++;
      } else {
        grid[i].color = this.emptyColor;
      }
    }

    this.setState({
      grid: grid,
      currGen: 1,
      bornCells: bornCells,
      totalLiveCells: totalLiveCells
    });
  };

  calculateNextGen = () => {
    let grid = [];
    let bornCells = 0;
    let deadCells = 0;
    let totalLiveCells = 0;

    this.state.grid.forEach(cell => {
      grid.push({ ...cell });
    });
    let activeNeighbors = 0;

    for (let i = 0; i < this.state.totalCells; i++) {
      activeNeighbors = 0;

      for (let j = 0; j < this.state.grid[i].neighbors.length; j++) {
        if (this.state.grid[this.state.grid[i].neighbors[j]].isAlive) {
          activeNeighbors++;
        }
      }

      // Kill the cell
      if (
        this.state.grid[i].isAlive &&
        (activeNeighbors !== 2 && activeNeighbors !== 3)
      ) {
        grid[i].isAlive = false;
        grid[i].color = this.deadColor;
        deadCells++;
      }
      // Living cell
      else if (
        this.state.grid[i].isAlive &&
        (activeNeighbors === 2 || activeNeighbors === 3)
      ) {
        grid[i].color = this.liveColor;
        bornCells--;
      }
      // Newly born cell
      else if (!this.state.grid[i].isAlive && activeNeighbors === 3) {
        grid[i].isAlive = true;
        grid[i].color = this.bornColor;
        bornCells++;
        totalLiveCells++;
      }
      // Previously dead cells become empty
      else if (
        !this.state.grid[i].isAlive &&
        activeNeighbors !== 3 &&
        this.state.grid[i].color === this.deadColor
      ) {
        grid[i].color = this.emptyColor;
        deadCells--;
      }
    }

    // simulation not running
    if (this.intervalId === null) {
      this.setState({
        grid: grid,
        currGen: this.state.currGen + 1,
        bornCells: bornCells,
        deadCells: deadCells,
        totalLiveCells: totalLiveCells
      });
    }
    // simulation running
    else {
      this.setState({
        grid: grid,
        currGen: this.state.currGen + 1,
        bornCells: bornCells,
        deadCells: deadCells,
        totalLiveCells: totalLiveCells,
        isClickable: false
      });
    }
  };

  playSimulation = event => {
    event.preventDefault();
    this.intervalId = setInterval(this.calculateNextGen, this.state.speed);
  };

  pauseSimulation = event => {
    event.preventDefault();

    clearInterval(this.intervalId);
    this.intervalId = null;
    this.setState({ isClickable: true });
  };

  gridResetHandler = event => {
    event.preventDefault();
    clearInterval(this.intervalId);
    this.intervalId = null;
    let grid = [];
    this.state.grid.forEach(cell => {
      grid.push({ ...cell });
    });

    for (let i = 0; i < this.state.totalCells; i++) {
      grid[i].isAlive = false;
      grid[i].color = 'white';
    }

    this.setState({
      grid: grid,
      currGen: 0,
      isClickable: true
    });
  };

  speedToggleHandler = event => {
    if (this.intervalId != null) {
      clearInterval(this.intervalId);
      this.intervalId = setInterval(this.calculateNextGen, event.target.value);
      this.setState({ speed: event.target.value });
    } else {
      this.setState({ speed: event.target.value });
    }
  };

  componentWillUnmount() {
    clearInterval(this.intervalId);
  }

  render() {
    return (
      <div className="App">
        <div className="container">
          <header>Conway's Game of Life</header>
          <div className="game-view">
            <h2>Generation #{this.state.currGen}</h2>
            <div className="grid">
              {this.state.grid.map((cell, value) => (
                <Cell
                  key={value}
                  id={value}
                  color={cell.color}
                  isClickable={this.state.isClickable}
                  cellClickHandler={this.cellClickHandler}
                />
              ))}
            </div>
            <div className="btns">
              <button
                type="button"
                disabled={this.state.isClickable ? false : true}
                onClick={this.randomGridHandler}
              >
                Generate Random Grid
              </button>
              <button
                type="button"
                onClick={() =>
                  (this.intervalId = setInterval(this.calculateNextGen, 1000))
                }
              >
                Play
              </button>
              <button type="button" onClick={this.pauseSimulation}>
                Pause
              </button>
              <button type="button" onClick={this.gridResetHandler}>
                Reset
              </button>
              <button
                type="button"
                disabled={this.state.isClickable ? false : true}
                onClick={this.calculateNextGen}
              >
                Next Generation
              </button>
              <div className="speed-btns">
                <h3>SPEED: </h3>
                <button
                  type="button"
                  value={2250}
                  className={this.state.speed === 2250 ? 'speed-active' : ''}
                  onClick={this.speedToggleHandler}
                >
                  0.5x
                </button>
                <button
                  type="button"
                  value={1500}
                  className={this.state.speed === 1500 ? 'speed-active' : ''}
                  onClick={this.speedToggleHandler}
                >
                  1x
                </button>
                <button
                  type="button"
                  value={750}
                  className={this.state.speed === 750 ? 'speed-active' : ''}
                  onClick={this.speedToggleHandler}
                >
                  1.5x
                </button>
              </div>
            </div>
          </div>
          <div className="info-view">
            <h2>Rules:</h2>
            <p>
              <strong>1.</strong> If the cell is alive and has 2 or 3 neighbors,
              then it remains alive. Else it dies.
              <br /> <br />
              <strong>2.</strong> If the cell is dead and has exactly 3
              neighbors, then it comes to life. Else it remains dead.
            </p>
            <div className="legend">
              <div className="legend-box box-green" />{' '}
              <span>Newly Born Cell</span>
              <div className="legend-box box-yellow" /> <span>Living Cell</span>
              <div className="legend-box box-black" /> <span>Dead Cell</span>
            </div>
          </div>
          <div className="about-game">
            <h2>About the Game of Life</h2>
            <p>
              The <strong>Game of Life</strong> is a cellular automaton designed
              by John Horton Conway. The game is played by creating an initial
              configuration of cells which evolves based on the rules specified.
              Advanced configurations will create patterns that will appear as
              animations or graphics.
            </p>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
