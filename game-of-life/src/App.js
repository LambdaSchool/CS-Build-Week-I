import React, { Component } from 'react';
import './App.css';
import Game from './components/Game.js';
import About from './components/About';
import {Link, Route} from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <div className="App">
        <h1>Conway's Game of Life</h1>
        <Route exact path="/" render={props => <Link to="/about">About Page</Link>} />
        <Route exact path="/" render={props => <Game />} />
        <Route path="/about" render={props => <About />} />
      </div>
    );
  }
}

export default App;
