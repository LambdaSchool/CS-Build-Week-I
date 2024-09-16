import React, { Component } from 'react';
import { connect } from 'react-redux';
import { makeRandomGrid, tick, startPlaying, stopPlaying, clear, resizeSmall, resizeMedium, resizeLarge } from '../actions/';

import Button from './button';

class Control extends Component {
  componentDidMount(){
    this.props.random();
    console.log(this.props.isRunning);
    // this.togglePlay();
  }
  
  render(){
    return (
      <div className="controls">
        <div className="buttons">
          <Button
            handleClick={() => this.props.random()}
            title={'Randomize'}
            icon={'fa fa-random'}
          />
          <Button
            handleClick={() => this.clear()}
            title={'Clear'}
            icon={'fa fa-undo'}
          />
          <Button
            handleClick={() => {
            this.togglePlay()
            this.props.running ? this.props.isRunning(false) : this.props.isRunning(true)
            }}
            icon={this.props.playState.isRunning ? 'fa fa-pause' : 'fa fa-play' }
            title={this.props.playState.isRunning ? 'Pause' : 'Play'}
          />
          <Button
            handleClick={() => this.props.tick()}
            icon={'fa fa-step-forward'}
            title={'Next Step'}
          />
          <br/><br/>
          <div className="button-group">
          <Button
            className="button"
            handleClick={() => this.props.resizeSmall()}
            icon={'fa fa-th-large'}
            title={'Small'}
            />
          <Button
            className="button"
            handleClick={() => this.props.resizeMedium()}
            icon={'fa fa-th-large'}
            title={'Medium'}
            />
          <Button
            className="button"
            handleClick={() => this.props.resizeLarge()}
            icon={'fa fa-th-large'}
            title={'Large'}
            />
          </div>
        </div>
      </div>
    );
  }
  togglePlay(){
    if (this.props.playState.isRunning) {
      clearInterval(this.props.playState.timerId);
      this.props.stopPlaying();
    } else {
      let interval = setInterval(this.props.tick,100);
      this.props.startPlaying(interval);
    }
  }
  clear(){
    if (this.props.playState.isRunning) {
      clearInterval(this.props.playState.timerId);
      this.props.stopPlaying();
    }
      this.props.clear();
  }
  resizeSmall(){
    if (this.props.playState.isRunning) {
      clearInterval(this.props.playState.timerId);
      this.props.stopPlaying();
    }
    this.props.resizeSmall();
  }
  resizeMedium(){
    if (this.props.playState.isRunning) {
      clearInterval(this.props.playState.timerId);
      this.props.stopPlaying();
    }
    this.props.resizeMedium();
  }
  resizeLarge(){
    if (this.props.playState.isRunning) {
      clearInterval(this.props.playState.timerId);
      this.props.stopPlaying();
    }
    this.props.resizeLarge();
  }
}


const mapStateToProps = ({playState}) => {
  return { playState };
}

const mapDispatchToProps = (dispatch) => {
  return {
    random: () => dispatch(makeRandomGrid()),
    tick: () => dispatch(tick()),
    startPlaying: (timerId) => dispatch(startPlaying(timerId)),
    stopPlaying: () => dispatch(stopPlaying()),
    clear: () => dispatch(clear()),
    resizeSmall: () => dispatch(resizeSmall()),
    resizeMedium: () => dispatch(resizeMedium()),
    resizeLarge: () => dispatch(resizeLarge())
  };
}

export default connect(mapStateToProps,mapDispatchToProps)(Control)