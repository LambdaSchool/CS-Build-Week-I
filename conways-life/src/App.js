import React, { Component } from 'react';
import Grid from './components/Grid';
import Rules from './components/Rules';
import History from './components/History';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="container">
        <h1>Conway's Game of Life</h1>
        <Grid />
        <Rules />
        <History />
      </div>
    );
  }
}

export default App;

// setInterval(function, delay)
// Starts repeatedly executing the function specified by function every delay milliseconds.

// requestAnimationFrame(callback)
// Tells the browser that you wish to perform an animation and requests that the browser call a specified function to update an animation before the next repaint.