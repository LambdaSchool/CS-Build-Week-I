import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import './App.css';
import LifeCanvas from './components/LifeCanvas';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Route exact path="/conways-life" component={LifeCanvas} />
      </div>
    );
  }
}

export default App;
