import React, { Component } from 'react';
import Board from './components/board';
import Control from './components/control';
import Counter from './components/counter';
import Rules from './components/rules';
import History from './components/history';
import Learn from './components/learn';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      running: false,
    }
  }

  isRunning = (bool) => {
    this.setState({
      running: bool 
    })
    console.log(bool);
  }

  render() {
    return (
      <div>
        <div>
          <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.5.0/css/font-awesome.min.css"></link>
          <h1>Game of Life</h1>
          <div>
            <Learn/>
          </div>
          <Board 
            running={this.state.running}
          />
          <Counter />
          <Control 
            running={this.state.running}
            isRunning={this.isRunning}
          />
        </div>
        <div className="whitespace"/>
        <div className="info">
          <Rules />
          <History />
        </div>
        <div className="footer-whitespace"/>
      </div>
    );
  }

  checkRunning = (e) => {
    e = this.state;
  }
}

export default App;
