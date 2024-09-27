import React, { Component } from 'react';
import './App.css';
import LifeCanvas from './components/LifeCanvas';
import Title from './components/Title';
import Description from './components/Description';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Title />
        <LifeCanvas />
        <Description />
      </div>
    );
  }
}

export default App;
