import React, { Component } from 'react';

class Cell extends Component {
  constructor() {
    super();
    this.state = {
      isAlive: false,
      neighbors: 0
    }
  }

  selectCell = () => {
    this.props.selectCell(this.props.row, this.props.col);
    this.setState({ isAlive: !this.state.isAlive });
  };

  render() {
    return (
      <div
        className={this.props.cellClass}
        id={this.props.id}
        onClick={this.selectCell}
      />
    );
  }
}

export default Cell;