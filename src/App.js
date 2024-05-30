import React, { Component } from 'react';
import './App.scss';
import Header from './Header/Header';
import Rules from './Rules/Rules';
import Controls from './Controls/Controls';
import GridSketch from './GOL/GridComponent';
import sketch from './GOL/GridSketch';
import Instructions from './Instructions/Instructions';
let isClear = false;

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      isRollin: false,
      generations: 0,
      isClear: false,
      isRandom: false,
    }
  }

  componentDidMount(){
    console.log(this.state.isRollin);
  }

  goBlastEm = () => {
    this.setState({isRollin: true});
  }

  pleaseDontHurtEm = () => {
    this.setState({isClear: true});
    window.setTimeout(()=>{
      this.setState({isClear: false});
    }, 5);
  }

  handleRandom = () => {
    console.log("random");
    
    this.setState({isRandom: true});
    window.setTimeout(()=>{
      this.setState({isRandom: false});
    }, 5);
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <Header></Header>
          <Rules></Rules>
          <Instructions></Instructions>
          <Controls data={this.state} goBlast={this.goBlastEm} stop={this.pleaseDontHurtEm} random={this.handleRandom}></Controls>
          <GridSketch className="grid-sketch" data={this.state}></GridSketch>
        </header>
      </div>
    );
  }
}

export default App;
