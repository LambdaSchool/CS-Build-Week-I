import React, { Component } from 'react';
import './components.css';

class Cell extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    handleClick = () => {
        this.props.handleClick(this.props.row, this.props.col);
    }

    render() {
        return (
            <div
                className={this.props.boxClassName}
                id={this.props.id}
                onClick={this.handleClick}
            />
        );
    }
}

export default Cell;