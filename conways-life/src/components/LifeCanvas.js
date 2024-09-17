import React, { Component } from "react";

import "./LifeCanvas.css";
import Cell from "./Cell";

class LifeCanvas extends Component {
  render() {
    const width = (this.props.cols * 4) +1;
    var rowsArr = [];

    var boxClass = "";


    for (let i = 0; i < this.props.rows; i++) {
      for (let j = 0; j < this.props.cols; j++) {
        let boxId = i + "_" + j;
        boxClass = this.props.gridFull[i][j] ? "box on" : "box off";
        rowsArr.push(
          <Cell
            boxClass={boxClass}
            key={boxId}
            boxId={boxId}
            row={i}
            col={j}
            selectBox={this.props.selectBox}
          />
        );
      }
    }
    return (
      <div className="grid" style={{ width: width }}>
        { rowsArr }
      </div>
    );
  }
}

export default LifeCanvas;
