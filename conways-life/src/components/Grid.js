import React, { Component } from 'react';
import Cell from './Cell';

class Grid extends Component {
  constructor(props) {
    super(props);
    this.state = {
      grid: []
    }
  }

  render() {
    const width = this.props.cols * 21;
    let rowsArr = [];

    let cellClass = "";

    for (let i = 0; i < this.props.rows; i++) {
      for (let j = 0; j < this.props.cols; j++) {
        let cellId = i + "," + j;

        cellClass = this.props.grid[i][j] ? "cell on" : "cell off";
        rowsArr.push(
          <Cell
            cellClass={cellClass}
            key={cellId}
            boxId={cellId}
            row={i}
            col={j}
            selectCell={this.props.selectCell}
          />
        );
      }
    }

    return (
      <div className="grid" style={{width: width}}>
        {rowsArr}
      </div>
    );
  }
}

export default Grid;