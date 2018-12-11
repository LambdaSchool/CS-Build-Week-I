import React from 'react';
import './Game.css';

class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            grid: [],
            isRunning: false,
            iterationCount: 0,
            cellColor: 'black',
            gridColor: 'white'
        };

        this.startGame = event => {
            event.preventDefault();
            if (this.state.isRunning) {
                return;
            }
            this.setState({ isRunning: true });
            this.continueGame();
        };

        this.stopGame = event => {
            event.preventDefault();
            if (!this.state.isRunning) {
                return;
            }
            window.clearTimeout(this.timeout);
            this.setState({ isRunning: false });
        };

        this.continueGame = () => {
                let grid = this.state.grid.map(row => row.slice());
                for (let i = 0; i < grid.length; i++) {
                    for (let j = 0; j < grid[i].length; j++) {
                        let count = this.countNeighbors(i, j);
                        if (grid[i][j]) {
                            if (count < 2 || count > 3) {
                                grid[i][j] = false;
                            }
                        } else {
                            if (count === 3) {
                                grid[i][j] = true;
                            }
                        }
                    }
                }
                this.setState({
                    grid: grid,
                    iterationCount: this.state.iterationCount + 1
                });

                this.timeout = setTimeout(() => {
                    this.continueGame();
                }, 500);
        };

        this.advanceOneStep = event => {
            event.preventDefault();
            if (this.state.isRunning) {
                return;
            }
            this.continueGame();
            window.clearTimeout(this.timeout);
            this.setState({ isRunning: false });
        };

        this.countNeighbors = (rowIndex, cellIndex) => {
            const neighbors = [
                [rowIndex - 1, cellIndex - 1],
                [rowIndex - 1, cellIndex],
                [rowIndex - 1, cellIndex + 1],
                [rowIndex, cellIndex - 1],
                [rowIndex, cellIndex + 1],
                [rowIndex + 1, cellIndex - 1],
                [rowIndex + 1, cellIndex],
                [rowIndex + 1, cellIndex + 1]
            ];

            let count = 0;

            for (let i = 0; i < neighbors.length; i++) {
                if ((neighbors[i][0] >= 0 && neighbors[i][0] <= 14) &&
                    (neighbors[i][1] >= 0 && neighbors[i][1] <= 14)) {
                    const position = neighbors[i];
                    if (this.state.grid[position[0]][position[1]]) {
                        count += 1;
                    }
                }
            }
            return count;
        };

        this.toggleCell = (rowIndex, cellIndex) => {
            let grid = this.state.grid;
            grid[rowIndex][cellIndex] = !grid[rowIndex][cellIndex];
            this.setState({ grid: grid });
        };

        this.clearGrid = event => {
            event.preventDefault();
            let grid = Array(15).fill(null).map(_ => Array(15).fill(false));
            this.setState({ grid: grid, isRunning: false, iterationCount: 0 });
            window.clearTimeout(this.timeout);
        };
        this.handleCellColorChange = event => {
            this.setState({ cellColor: event.target.value });
        };
        this.handleGridColorChange = event => {
            this.setState({ gridColor: event.target.value });
        };
    }

    componentDidMount() {
        let grid = Array(15).fill(null).map(_ => Array(15).fill(false));
        this.setState({ grid: grid });
    }

    render() {
        return (
            <div className="container">
                <div>{this.state.iterationCount} generations</div>
                <div className="grid-container" style={{ backgroundColor: this.state.gridColor }}>
                    {this.state.grid.map((row, rowIndex) => {
                        return <div key={rowIndex}
                            className="row">{row.map((cell, cellIndex) => {
                                if(cell) {
                                    return <div key={cellIndex}
                                        className="live-cell"
                                        style={{backgroundColor: this.state.cellColor}}
                                        onClick={!this.state.isRunning ?
                                            () => this.toggleCell(rowIndex, cellIndex) : null}
                                    >{cell}</div>;   
                                } else return <div key={cellIndex}
                                    className="dead-cell"
                                    style={{ backgroundColor: this.state.gridColor }}
                                    onClick={!this.state.isRunning ?
                                        () => this.toggleCell(rowIndex, cellIndex) :
                                        null}
                                >{cell}</div>;
                            })}</div>;
                    })}
                </div>
                <div className="controls">
                    <p onClick={this.startGame}>start</p>
                    <p onClick={this.stopGame}>stop</p>
                    <p onClick={this.clearGrid}>clear</p>
                    <p onClick={this.advanceOneStep}>next</p>
                </div>
                <div className="options">
                    <p>patterns</p>
                    <label>grid color: </label>
                    <select value={this.state.value} onChange={this.handleGridColorChange}>
                        <option value="white">White</option>
                        <option value="#0074D9">Blue</option>
                        <option value="#7FDBFF">Aqua</option>
                        <option value="#39CCCC">Teal</option>
                        <option value="#2ECC40">Green</option>
                        <option value="#FFDC00">Yellow</option>
                        <option value="#FF851B">Orange</option>
                        <option value="#FF4136">Red</option>
                        <option value="#B10DC9">Purple</option>
                        <option value="#85144b">Maroon</option>
                        <option value="#AAAAAA">Gray</option>
                    </select>
                    <label>cell color: </label>
                    <select value={this.state.value} onChange={this.handleCellColorChange}>
                        <option value="black">Black</option>
                        <option value="#0074D9">Blue</option>
                        <option value="#7FDBFF">Aqua</option>
                        <option value="#39CCCC">Teal</option>
                        <option value="#2ECC40">Green</option>
                        <option value="#FFDC00">Yellow</option>
                        <option value="#FF851B">Orange</option>
                        <option value="#FF4136">Red</option>
                        <option value="#B10DC9">Purple</option>
                        <option value="#85144b">Maroon</option>
                        <option value="#AAAAAA">Gray</option>
                    </select>
                </div>
            </div>
        );
    }
}

export default Game;