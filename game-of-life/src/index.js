import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { ButtonToolbar, MenuItem, DropdownButton } from 'react-bootstrap';


class Main extends React.Component {
    constructor() {
        super();
        this.speed = 100;
        this.rows = 30;
        this.cols = 50;
        
        this.state = {
            generation: 0,
            gridFull: Array(this.rows).fill().map(() => Array(this.cols).fill(false))
        }
    }
    selectBox = (row, col) => {
        let gridCopy = arrayClone(this.state.gridFull);
        gridCopy[row][col] =!gridCopy[row][col];
        this.setState({
            gridFull: gridCopy
        });
    }

    seed = () => {
        let gridCopy = arrayClone(this.state.gridFull);
        for (let i = 0; i < this.rows; i ++) {
            for (let j = 0; j < this.cols; j++) {
                if (Math.floor(Math.random() * 4) === 1) {
                    gridCopy[i][j] = true;
                }
            }
        }
        this.setState({
            gridFull: gridCopy
        });    
    }

    playButton = () => {
        clearInterval(this.intervalId)
        this.intervalId = setInterval(this.play, this.speed);
    }


    pauseButton = () => {
        clearInterval(this.intervalId);
    }

    slow = () => {
        this.speed = 1000;
        this.playButton();
    }

    fast = () => {
        this.speed = 100;
        this.playButton();
    }

    clear = () => {
        var grid = Array(this.rows).fill().map(() => Array(this.cols).fill(false));
        this.setState({
            gridFull: grid,
            generation: 0
        });
    }

    gridSize = (size) => {
        switch (size) {
            case "1":
                this.cols = 35;
                this.rows = 20;
            break;
            case "2":
                this.cols = 50;
                this.rows = 30;
            break;
            default:
                this.cols = 70;
                this.rows = 50;
        }
        this.clear();
            
    }

    play = () => {
        let g = this.state.gridFull;
        let g2 = arrayClone(this.state.gridFull);
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
    
    componentDidMount() {
        this.seed();
        this.playButton();
    }

    render() {
        return (
            <div>
                <h1>The Game of Life</h1>
                <Buttons 
                    playButton={this.playButton}
					pauseButton={this.pauseButton}
					slow={this.slow}
					fast={this.fast}
					clear={this.clear}
					seed={this.seed}
					gridSize={this.gridSize}
				/>
            <Grid
                gridFull={this.state.gridFull}
                rows={this.rows}
                cols={this.cols} 
                selectBox={this.selectBox}
            />
            <h2>Generations: {this.state.generation}</h2>
            
            <h2>Rules</h2>
            <h3>1. Any live cell with fewer than two live neighbours dies, as if by underpopulation.</h3>
            <h3>2. Any live cell with two or three live neighbours lives on to the next generation.</h3>
            <h3>3. Any live cell with more than three live neightbours dies, as if by overpopulation.</h3>
            <h3>4. Any dead cell with exactly three live neighbours becomes a live cell, as if by reprodution.</h3>
            <h2>History</h2>
            <h3>The Game of life is a cellular automation devised by the British mathematician John Conway. The game is a zero-player game, meaning that its evolution is determined by its initial state, requiring no further input. One interacts whith the game of life by creating an initial configuration and observing how it evolves.</h3>
            </div>
        );
    }
}

function arrayClone(arr) {
    return JSON.parse(JSON.stringify(arr));
}

class Grid extends React.Component {
    render() {
        const width = (this.props.cols * 14);
        var rowsArr = [];

        var boxClass ="";
        for (var i = 0; i < this.props.rows; i++) {
            for (var j = 0; j < this.props.cols; j++) {
                let boxId = i + "_" + j;

                boxClass = this.props.gridFull[i][j] ? "box on" : "box off";
                rowsArr.push(
                    <Box 
                    boxClass={boxClass}
                    key={boxId}
                    boxId={boxId}
                    row={i}
                    col={j}
                    selectBox={this.props.selectBox}
                />
                );
            }
        }
        return (
            <div className="grid" style={{width: width}}>
                {rowsArr}
            </div>
        );
    }
}

class Box extends React.Component {
    
    selectBox = () => {
        this.props.selectBox(this.props.row, this.props.col);
    }

    render() {
        return (
            <div
                className={this.props.boxClass}
                id={this.props.id}
                onClick={this.selectBox}
            >
            </div>
        );
    }
}

class Buttons extends React.Component { 

    handleSelect = (evt) => {
        this.props.gridSize(evt);
    }

    render() {
        return (
            <div className="center">
                <ButtonToolbar>
                    <button className="button" onClick={this.props.playButton}>
                        Play
                    </button>
                    <button className="button" onClick={this.props.pauseButton}>
                        Pause
                    </button>
                    <button className="button" onClick={this.props.clear}>
                        Clear
                    </button>
                    <button className="button" onClick={this.props.slow}>
                        Slow
                    </button>
                    <button className="button" onClick={this.props.fast}>
                        Fast
                    </button>    
                    <button className="button" onClick={this.props.seed}>
                        Seed
                    </button>    
                    <DropdownButton
                        className="button"
                        title="Grid Size"
                        id="size=menu"
                        onSelect={this.handleSelect}
                    >
                        <MenuItem eventKey="1">35x20</MenuItem>
                        <MenuItem eventKey="2">50x30</MenuItem>
                        <MenuItem eventKey="3">70x50</MenuItem>
                    </DropdownButton>
                </ButtonToolbar>
            </div>
        )
    }
}

ReactDOM.render(<Main />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
