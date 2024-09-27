import React, { Component } from 'react';
import './App.css';

import Home from './component/Home';

class App extends Component {
  render() {
    return (
      // <React.Fragment>
        <div className="container">
          <Home />
        </div>
      // </React.Fragment>
    );
  }
}

export default App;
