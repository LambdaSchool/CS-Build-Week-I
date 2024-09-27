import React from 'react';
import Grid from './Grid';
import Controls from './Controls';
import Presets from './Presets';
import "../scss/Game.scss";

function makeEmptyGrid(rows, columns) {
    return Array(rows).fill().map(() => Array(columns).fill(false))
}

function copyGrid(arr) {
    return JSON.parse(JSON.stringify(arr));
}

class Game extends React.Component {
    constructor() {
        super();
        this.speed = 100;
        this.rows = 25;
        this.columns = 25;
        this.state = {
            // number of cycles, simulation runs through
            generations: 0,
            // inital grid with all cells dead
            grid: makeEmptyGrid(this.rows, this.columns) 
        }
    }

    selectCell = (row, col) => {
        // make new grid to modifiy it
        let newGrid = copyGrid(this.state.grid)
        //whatever clicked cell was set to opposite
        newGrid[row][col] = !newGrid[row][col];
        // set new grid to state
        this.setState({
            grid: newGrid
        })
    }

    randomSeed = () => {
        this.clear()
        // make a new grid and random modify it
        let newGrid = copyGrid(this.state.grid)
        for (let i = 0; i < this.rows; i++) {
            for(let j = 0; j < this.columns; j++) {
                //make a quarter of the cells alive at start
                if (Math.floor(Math.random() * 4) === 1) {
                    newGrid[i][j] = true
                }
            }
        }
        // set new grid to state
        this.setState({
            grid: newGrid
        })
    }

    oscillatorSeed = () => {
        this.clear()
        let newGrid = copyGrid(this.state.grid)
        for (let i = 0; i < this.rows; i++) {
            for(let j = 0; j < this.columns; j++) {
                //make a quarter of the cells alive at start
                if (i === 4 && j === 3) {
                    newGrid[i][j] = true
                }
                if (i === 4 && j === 4) {
                    newGrid[i][j] = true
                }
                if (i === 4 && j === 5) {
                    newGrid[i][j] = true
                }
            }
        }
        // set new grid to state
        this.setState({
            grid: newGrid
        })
    }

    gliderSeed = () => {
        this.clear()
        let newGrid = copyGrid(this.state.grid)
        for (let i = 0; i < this.rows; i++) {
            for(let j = 0; j < this.columns; j++) {
                //make a quarter of the cells alive at start
                if (i === 0 && j === 2) {
                    newGrid[i][j] = true
                }
                if (i === 1 && j === 0) {
                    newGrid[i][j] = true
                }
                if (i === 1 && j === 2) {
                    newGrid[i][j] = true
                }
                if (i === 2 && j === 1) {
                    newGrid[i][j] = true
                }
                if (i === 2 && j === 2) {
                    newGrid[i][j] = true
                }
            }
        }
        // set new grid to state
        this.setState({
            grid: newGrid
        })
    }

    spaceShipSeed = () => {
        this.clear()
        let newGrid = copyGrid(this.state.grid)
        for (let i = 0; i < this.rows; i++) {
            for(let j = 0; j < this.columns; j++) {
                //make a quarter of the cells alive at start
                if (i === 1 && j === 1) {
                    newGrid[i][j] = true
                }
                if (i === 1 && j === 4) {
                    newGrid[i][j] = true
                }
                if (i === 2 && j === 5) {
                    newGrid[i][j] = true
                }
                if (i === 3 && j === 1) {
                    newGrid[i][j] = true
                }
                if (i === 3 && j === 5) {
                    newGrid[i][j] = true
                }
                if (i === 4 && j === 2) {
                    newGrid[i][j] = true
                }
                if (i === 4 && j === 3) {
                    newGrid[i][j] = true
                }
                if (i === 4 && j === 4) {
                    newGrid[i][j] = true
                }
                if (i === 4 && j === 5) {
                    newGrid[i][j] = true
                }
            }
        }
        // set new grid to state
        this.setState({
            grid: newGrid
        })
    }

    play = () => {
        this.speed = 100
        clearInterval(this.interval)
        this.interval = setInterval(this.run, this.speed)
    }

    fastforward = () => {
		this.speed = 10;
		clearInterval(this.interval)
        this.interval = setInterval(this.run, this.speed)
	}

    pause = () => {
		clearInterval(this.interval);
    }
    
    clear = () => {
        clearInterval(this.interval);
        let emptyGrid = makeEmptyGrid(this.rows, this.columns)
        this.setState({
            grid: emptyGrid,
            generations: 0
        })
    }

    gridSize = (size) => {
        switch (size) {
            case "small":
                this.rows = 10
                this.columns = 10
            break;
            case "regular":
                this.rows = 25
                this.columns = 25
            break;
            case "large":
                this.rows = 40
                this.columns = 40
            break;
            default:
                this.rows = 25
                this.columns = 25
        }
        this.clear();
    }

    run = () => {
        let grid = this.state.grid
        let newGrid = copyGrid(this.state.grid)

        for (let i = 0; i < this.rows; i++) {
            for(let j = 0; j < this.columns; j++) {
                let count = 0
                // i and j cannot be negative indexes then check
                // if neighbors are live and increment count if they are
                if (i > 0) {
                    if (grid[i - 1][j]) count++;
                }
                if (i > 0 && j > 0) {
                    if (grid[i - 1][j - 1]) count++;
                }
                if (i > 0 && j < this.columns - 1) {
                    if (grid[i - 1][j + 1]) count++;
                }
                if (j < this.columns - 1) {
                    if (grid[i][j + 1]) count++;
                }
                if (j > 0) {
                    if (grid[i][j - 1]) count++;
                }
                if (i < this.rows - 1) {
                    if (grid[i + 1][j]) count++;
                }    
                if (i < this.rows - 1 && j > 0) {
                    if (grid[i + 1][j - 1]) count++;
                }
                if (i < this.rows - 1 && j < this.columns - 1) {
                    if (grid[i + 1][j + 1]) count++;
                }
                //based on count set cell to live or dead
                if (grid[i][j] && (count < 2 || count > 3)) {
                    newGrid[i][j] = false;
                }
                if (!grid[i][j] && count === 3) {
                    newGrid[i][j] = true;
                }
            }
        }
        this.setState({
            // set new grid to state and increment generations(cycle)
            grid: newGrid,
            generations: this.state.generations + 1
          });        
    }

    render() {
        return (
            <div className="game">
                <div className="top">
                    <h4>Generations: {this.state.generations}</h4>
                    <h2>Conway's Game of Life</h2>
                </div>
                <div className="main">
                    <Controls 
                        play={this.play}
                        pause={this.pause}
                        clear={this.clear}
                        fastforward={this.fastforward}
                        gridSize={this.gridSize}
                    />
                    <Grid 
                        grid={this.state.grid}
                        rows={this.rows}
                        columns={this.columns}
                        selectCell={this.selectCell}
                    />
                    <Presets 
                        randomSeed={this.randomSeed}
                        oscillatorSeed={this.oscillatorSeed}
                        gliderSeed={this.gliderSeed}
                        spaceShipSeed={this.spaceShipSeed}
                    />
                </div>
                
            </div>
        )
    }
}

export default Game;