import React from 'react';
import play from '../assets/play.svg';
import pause from '../assets/pause.svg';
import stop from '../assets/stop.svg';
import {ControlsWrapper} from '../theme/css';

const Controls = props => {
    return(
    <ControlsWrapper>
    <img src={pause} alt="pause button"></img>
    <img onClick={this.props.start} src={play} alt="play button"/>
    <img onClick={this.props.stop} src={stop} alt="stop button"/>
    </ControlsWrapper>)
}

export default Controls;