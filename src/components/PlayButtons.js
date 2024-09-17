import React, { Component } from 'react';

class PlayButtons extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {
        return (
            <div className="thirtyPer displayFlex">
                <button className='playB' onClick={this.props.handlePlay}>Play</button>
                <button className='playB' onClick={this.props.handlePause}>Pause</button>
                <button className='playB' onClick={this.props.handleStop}>Clear</button>
            </div>
        );
    }
}

export default PlayButtons;