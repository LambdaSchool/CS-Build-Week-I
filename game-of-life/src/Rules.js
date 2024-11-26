import React, { Component } from 'react';
import './App.css';

class Rules extends Component {

      render(){
      return(
        <div className = "text-block">
            <h4>
                Rules of the Game
            </h4>
            <p>
                Every cell interacts with its eight neighbours, which are the cells that are horizontally, vertically, or diagonally adjacent. At each step in time, the following transitions occur:
            </p>    
            <p>
                1. Any live cell with fewer than two live neighbors dies, as if by underpopulation.
            </p>
            <p>
                2. Any live cell with two or three live neighbors lives on to the next generation.
            </p>
            <p>
                3. Any live cell with more than three live neighbors dies, as if by overpopulation.
            </p>
            <p>
                4. Any dead cell with exactly three live neighbors becomes a live cell, as if by reproduction.
            </p>
        </div>
      );
    }
  }

  export default Rules;