
import React from "react";
import "./Game.css";
import GameCell from './GameCell'
import {Link} from 'react-router-dom';


const game_cell = 20;
const game_width = 640;
const game_height = 440;


class Game extends React.Component {
    constructor() {
        super();
        this.rows = game_height / game_cell;
        this.columns = game_width / game_cell;
        this.gameboard = this.makeNewBoard();
    }
    state = {
        gamecells: [],
        interval: 100,
        isEngaged: false,
        generationNum: 0
    };

    makeNewBoard() {
    let gameboard = [];
    for (let y = 0; y < this.rows; y++) {
        gameboard[y] = [];
            for (let x = 0; x < this.columns; x++) {
                gameboard[y][x] = false;
            }
        }
        return gameboard;
    }
     

    makeNewCells() {
    let gamecells = [];
    for (let y = 0; y < this.rows; y++) {
        for (let x = 0; x < this.columns; x++) {
        if (this.gameboard[y][x]) {
            gamecells.push({ x, y });
        }
    }
    }
        return gamecells;
    }
    
    getElement() {
    const rect = this.boardRef.getBoundingClientRect();
    const doc = document.documentElement;
    
        return {
            x: rect.left + window.pageXOffset - doc.clientLeft,
            y: rect.top + window.pageYOffset - doc.clientTop
        };
    }
    
    handleClick = e => {
    const elemOffset = this.getElement();
    const offsetX = e.clientX - elemOffset.x;
    const offsetY = e.clientY - elemOffset.y;
  
    const x = Math.floor(offsetX / game_cell);
    const y = Math.floor(offsetY / game_cell);
  
    if (x >= 0 && x <= this.columns && y >= 0 && y <= this.rows) {
        this.gameboard[y][x] = !this.gameboard[y][x];
    }
        this.setState({ gamecells: this.makeNewCells() });
    };
    
    startGame = () => {
        this.setState({ isEngaged: true }, () => this.iterationMethod());
    };
    
    stopGame = () => {
        this.setState({ isEngaged: false });
        if (this.timeoutHandler) {
            window.clearTimeout(this.timeoutHandler);
            this.timeoutHandler = null;
        }
    };

    handleClear = () => {
        this.gameboard = this.makeNewBoard();
        this.setState({ gamecells: this.makeNewCells() , generationNum: 0 });
      };

      handleRandom = () => {
        for (let y = 0; y < this.rows; y++) {
          for (let x = 0; x < this.columns; x++) {
            this.gameboard[y][x] = Math.random() >= 0.5;
          }
        }
        this.setState({ gamecells: this.makeNewCells() });
      };
    
    iterationMethod = () => {
    let newGameBoard = this.makeNewBoard();
    
    for (let y = 0; y < this.rows; y++) {
        for (let x = 0; x < this.columns; x++) {
        let neighbors = this.neighborsMethod(this.gameboard, x, y);
            if (this.gameboard[y][x]) {
                if (neighbors === 2 || neighbors === 3) {
                    newGameBoard[y][x] = true;
                } 
                else {
                    newGameBoard[y][x] = false;
                }
            } 
            else {
                if (!this.gameboard[y][x] && neighbors === 3) {
                    newGameBoard[y][x] = true;
            }
        }
        }
    }

    this.gameboard = newGameBoard;
    this.setState({ gamecells: this.makeNewCells() });

    if (this.state.isEngaged) {
    this.timeoutHandler = window.setTimeout(() => {
        this.iterationMethod();
    }, this.state.interval);
    }

    let newGeneration = this.state.generationNum;
    ++newGeneration;
    this.setState({ generationNum: newGeneration });
    console.log(this.state.generationNum);
    }

/**
   * this will calculate the number of neighbors at point (x, y)
   * @param {Array} gameboard
   * @param {int} x
   * @param {int} y
   */
  neighborsMethod(gameboard, x, y) {
    let neighbors = 0;
    const dirs = [[-1, -1],[-1, 0],[-1, 1],[0, 1],[1, 1],[1, 0],[1, -1],[0, -1]];
    for (let i = 0; i < dirs.length; i++) {
      const dir = dirs[i];
      let y1 = y + dir[0];
      let x1 = x + dir[1];

      if (
        x1 >= 0 &&
        x1 < this.columns &&
        y1 >= 0 &&
        y1 < this.rows &&
        gameboard[y1][x1]
      ) {
        neighbors++;
      }
    }
    return neighbors;
  }

  handleInterval = e => {
    this.setState({ interval: e.target.value });
  };

  render() {
    const { gamecells } = this.state;
    return (
      <div>
        <div><h3>Generation: {this.state.generationNum}</h3>
        <div className="speed">
          Update Every{" "}
          <input
            value={this.state.interval}
            onChange={this.handleInterval}
          />{" "}
          milliseconds
          </div>
        </div>
        <div className="container">
        <div
          className="gameBoard"
          style={{
            width: game_width,
            height: game_height,
            backgroundSize: `${game_cell}px ${game_cell}px`
          }}
          onClick={this.handleClick}
          ref={n => {
            this.boardRef = n;
          }}
        >
          {gamecells.map(gamecell => (
            <GameCell x={gamecell.x} y={gamecell.y} key={`${gamecell.x}, ${gamecell.y}`} />
          ))}
        </div>
        <div className="controls">
          {this.state.isEngaged ? (
            <button className="button" onClick={this.stopGame}>
              Stop Game
            </button>
          ) : (
            <button className="button" onClick={this.startGame}>
              Start Game
            </button>
          )}
          <button className="button" onClick={this.handleRandom}>
            Random
          </button>
          <button className="button" onClick={this.iterationMethod}>
            One Step
          </button>
          <button className="button" onClick={this.handleClear}>
            Clear
          </button>
        
          <div>
        <div> <Link to='/' className="home-link"><button className="home-button button">Go Home!</button></Link></div>
        </div>
          
          </div>
          
        </div>
        
      </div>
    );
  }
}



export default Game;


