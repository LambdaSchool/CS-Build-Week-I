import React, { Component } from 'react';
import P5Wrapper from '../P5Wrapper/P5Wrapper';
import sketch from './GridSketch';
import './styles/gridcomponent.scss';

class Grid extends Component {
  constructor(props){
    super(props);
    this.state = {
      sketchy: sketch,
    }
  }

  render(){
    return (
      <div className="sketch-container">
        <P5Wrapper sketch={this.state.sketchy} data={this.props.data}/>
      </div>
    )
  }

}

export default Grid;
