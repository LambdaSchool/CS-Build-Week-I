import React from 'react';
import './cell.scss';

const Cell = props => {
  return (
    <div
      style={{
        backgroundColor: props.color,
        cursor: props.isClickable ? 'pointer' : 'not-allowed'
      }}
      className="cell tooltip"
      onClick={() => props.cellClickHandler(props.id)}
    >
      <span className="tooltip-text">{props.id}</span>
    </div>
  );
};

export default Cell;
