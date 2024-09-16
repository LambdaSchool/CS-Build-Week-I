import React, { Component } from "react";
import Box from "./GridBox";
import { connect } from "react-redux";
import { populateArrayBoxes, startRunning, pauseRunning } from "../actions";

class GridLayout extends Component {
  componentDidMount() {
    this.props.populateArrayBoxes(this.props.gridRows);
  }

  playAlgorithm = () => {
    // Rules: if the live cell has 0 or 1 neighbors then it dies
    //        if the live cell has 2 or 3 neighbors then it will stay alive
    // if a live cell has 4 or more neighbors, it will die
    // if the dead cell has three or more neighbors it will become active
    // check coordinates all around the square, if the y-1, y-1 x + 1, x + 1, y + 1 x + 1, y + 1, y + 1 x - 1, x-1, y-1 x-1
    this.state.gridBoxArr.forEach(box => {
      if (box.coords.x === 1) {
      }
    });
    this.startRunning();
  };

  render() {
    return (
      <div className="grid">
        {this.props.gridBoxArr.map(box => {
          return (
            <Box
              runningGame={this.props.isRunning}
              key={box.id}
              id={box.id}
              active={box.active}
            />
          );
        })}
        <button onClick={this.props.startRunning} className="start-button">
          Start
        </button>
        <button onClick={this.props.pauseRunning} className="pause-button">
          Pause
        </button>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    gridRows: state.gridRows,
    gridBoxArr: state.gridBoxArr,
    isRunning: state.isRunning
  };
};

export default connect(
  mapStateToProps,
  { populateArrayBoxes, startRunning, pauseRunning }
)(GridLayout);
