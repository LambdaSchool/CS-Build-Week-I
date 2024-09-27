import React, { Component } from 'react';
import ControlsButton from './ControlsButton';

export default class Controls extends Component {
  constructor(props) {
    super(props);
    this.state = {
      timer: undefined
    };
  }

  onStepClick = e => {
    this.props.step();
    console.log('step click');
  };

  onPlayStopClick = e => {
    this.props.playStop();
    console.log('play/stop click');
  };

  onClearClick = e => {
    this.props.clear();
    console.log('clear click');
  };

  onRandomizeClick = e => {
    this.props.randomize();
    console.log('randomize click');
  };

  render() {
    return (
      <div className="controls">
        <div className="controls__button-container">
          <ControlsButton icon="stop" onButtonClick={this.onPlayStopClick} isShowingPlay={this.props.isShowingPlay} />
          <ControlsButton icon="step-forward" onButtonClick={this.onStepClick} isShowingPlay={this.props.isShowingPlay} />
          <ControlsButton icon="eraser" onButtonClick={this.onClearClick} isShowingPlay={this.props.isShowingPlay} />
          <ControlsButton icon="question" onButtonClick={this.onRandomizeClick} isShowingPlay={this.props.isShowingPlay} />
        </div>
        <div className="controls__generation"><span className="controls__generation-number">{this.props.generationNumber}</span> Generation</div>
      </div>
    );
  }
}
