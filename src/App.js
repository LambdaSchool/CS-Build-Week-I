import React, { Component } from 'react';
import './App.css';
import Main from './components/Main';
import Info from './components/Info';

class App extends Component {
  render() {
    return (
      <div className="App">
          <Main />
          <Info />
      </div>
    );
  }
}

export default App;
