import React, { Component } from 'react';
import { Route } from "react-router-dom";

import Grid from './Grid'
import ContentBar from "./ContentBar";
import Rules from './Rules';

import './App.css';
import './ContentBar.css'

class App extends Component {

 
  render() {
    return (
      <div className="App">
       <ContentBar />
       <Grid />
       <Route exact path='home' component={App}/>
       <Route path="/rules" component={Rules} />
      </div>
    );
  }
}

export default App;
