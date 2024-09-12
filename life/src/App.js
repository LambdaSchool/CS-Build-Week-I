import React, { Component } from 'react';
import './App.css';
import Canvas from './Canvas';


class App extends Component {

  render() {
    return (
      <div className="App">
        <Canvas width={450} height={350} />        
      </div>
    );
  }
}

export default App;

