import React, { Component } from 'react';
import './App.css';
import Game from './Game';
import Home from './Home';
import { Route } from "react-router-dom"; 

class App extends Component {
  render() {
    return (
      <div className="App">
      <h1>Conway's Game of Life</h1>
        <Route exact path='/' component={Home} />
        <Route path='/Game' component={Game} />
      </div>
    );
  }
}

export default App;
