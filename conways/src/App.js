import React, { Component } from 'react';
import Board from './components/Board/Board'
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="header">
          <h4>Conways Game of Life</h4>
        </div>
        <div className="main-ctn">
          <div className="board-ctn">
            <Board />
          </div>
          <div className="rules-ctn">
            <ol>
              <h4>Rules:</h4>
              <li className="rule-item">Any live cell with fewer than two live neighbors dies, as if by underpopulation.</li>
              <li className="rule-item">Any live cell with two or three live neighbors lives on to the next generation.</li>
              <li className="rule-item">Any live cell with more than three live neighbors dies, as if by overpopulation.</li>
              <li className="rule-item">Any dead cell with exactly three live neighbors becomes a live cell, as if by reproduction.</li>
            </ol>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
