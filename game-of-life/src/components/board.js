import React, { Component } from 'react';
import { connect } from 'react-redux';

import { currentState } from '../actions/';

import Cell from './cell';

class Board extends Component {
  render(){
    return(
      <div className="board">
        <table>
          <tbody>
            {this.props.board.map((row,i) =>
              <tr key={i}>{row.map((cell, j) =>
                <Cell
                  key={j}
                  alive={cell.status}
                  newBorn={cell.newBorn}
                  handleClick={() => this.props.currentState(i,j)}
                  running={this.props.running}
                />)}
              </tr>)}
          </tbody>
        </table>
      </div>
    )
  }
}

const mapStateToProps = ({ board }) => {
  return { board };
}

const mapDispatchToProps = (dispatch) => {
  return { currentState: (x,y) => dispatch(currentState(x,y)) }
}

export default connect(mapStateToProps, mapDispatchToProps)(Board);