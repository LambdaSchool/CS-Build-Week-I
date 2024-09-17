import React from 'react';
import './board.css';

const Board = (props) => {
  let cells = [];
  for(let i = 0; i < (props.rows * props.cols); i++){
    cells.push(<div className="cell" key={i} cellnumber={i} onClick={props.getGridPos}></div>)
  }
  return(
    <div className="board-container">
      {cells}
    </div>
  )
}

export default Board;
