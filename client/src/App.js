import React, { Component } from 'react';
import './App.css';
import CellGrid from './components/cellgrid';

class App extends Component {
  constructor(props) {
    super(props);
}

  render() {
    return (
      <div className="App">
        <div className="rules-container">
            <h1> Rules </h1>
            <a> If a cell is alive and it has exactly 2 or 3 live neighbors, it stays alive.<br></br><br></br>
              
                If a cell is alive and it has less than 2 or 4+ live neighbors, it dies. <br></br><br></br>
                
                If a cell is dead and it has exactly 3 live neighbors, it comes to life. </a>
          </div>
        <CellGrid/>
        <div className="info-container">
            <h1> Conway's Game of Life </h1>
            <a href="https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life"> Link to wiki</a>
            <p> The Game of Life, also known simply as Life, is a cellular automaton devised by the British mathematician John Horton Conway in 1970.</p>
          </div>
      </div>
    );
  }
}

export default App;
