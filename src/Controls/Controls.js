import React, { Component } from 'react';
import './controls.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPause, faPlay, faEraser, faRandom } from '@fortawesome/free-solid-svg-icons'

let isGoing = false;

class Controls extends Component {
  constructor(props){
    super(props);
    this.state = {
      isGoing: this.props.data.isRollin,
    }
  }

  componentDidMount(){
    let ctrl = document.querySelector('.controls-container');
    window.setTimeout(()=>{
      ctrl.classList.add('show-container');
    }, 100);
    window.setTimeout(()=>{
      ctrl.classList.add('show-container');
    }, 5500);
  }

  toggleOnGoing = () => {
    isGoing = (isGoing === false) ? true : false;
    this.props.goBlast();
  }

  handleRandom = () => {
    this.props.random();
  }

  handleClear = () => {
    this.props.stop();
  }

  render(){
    return (
      <div className="controls-container">
        <button className="controls-btn" onClick={()=>{this.toggleOnGoing()}}>{ //Check if message failed
        (isGoing === false)
          ? <FontAwesomeIcon icon={faPlay} />
          : <FontAwesomeIcon icon={faPause} /> 
      }</button>
        <button className="controls-btn" onClick={()=>{this.handleClear()}}><FontAwesomeIcon icon={faEraser} /></button>
        <button className="controls-btn" onClick={()=>{this.handleRandom()}}><FontAwesomeIcon icon={faRandom} /></button>
      </div>
    )
  }

}



export default Controls;


