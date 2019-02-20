import React, { Component } from "react";
import "./Cell.css";

class Cell extends Component {
  render() {
    return <div onClick={() => this.props.initialCell(this.props.status)} className={this.props.living ? "cellLive" : "cellDead"}></div>;
  }
}
export default Cell;
