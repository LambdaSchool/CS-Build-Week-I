import React, { Component } from 'react';
class Cell extends Component {

    render() {
      return (
        <div onClick={() => this.props.storeCell(this.props.position)} className={this.props.isAlive ? "cell-container-alive" : "cell-container-dead"}></div>
      );
    }
  }

export default Cell;
