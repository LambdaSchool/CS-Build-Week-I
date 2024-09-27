import React, { Component } from 'react';
import './App.css';
import Grid from './Components/Grid';
import Dashboard from './Components/Dashboard';

class App extends Component {
  constructor() {
    super();
    this.state = {
      gameIsRunning: 0,
      generationNumber: 0,
      numberOfRows: 10,
      numberOfColumns: 10,
      cellStates: [],
    }
  }

  inputChangeHandler = e => {
    e.preventDefault();
    const {name, value} = e.target;
    console.log('name: ', name, 'value: ', value);
    this.setState({[name]: value});
  }

  generateGrid = e => {
    e.preventDefault();
    const numberOfRows = this.state.numberOfRows;
    const numberOfColumns = this.state.numberOfColumns;
    
    let gridRow = [];
    for (let i = 0; i < numberOfColumns; i++) {
        gridRow.push(0);
    };

    let cellStates = [];
    for (let i = 0; i < numberOfRows; i++) {
        cellStates.push(gridRow);
    };

    this.setState({cellStates: cellStates});
  }


  render() {
    return (
      <div>
        <h1>Game of Life</h1>
        <Grid 
          cellStates = {this.state.cellStates}
        />
        <Dashboard 
          inputChangeHandler = {this.inputChangeHandler}
          generateGrid = {this.generateGrid}
        />
      </div>
    );
  }
}

export default App;
