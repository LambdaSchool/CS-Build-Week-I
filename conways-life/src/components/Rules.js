import React from 'react';

const Rules = () => {
    return (
      <div>
          <h3>Rules:</h3>
          <ul>
              <li>Any live cell with fewer than two live neighbors dies</li>
              <li>Any live cell with two or three live neighbors lives</li>
              <li>Any live cell with more than three live neighbors dies</li>
              <li>Any dead cell with exactly three live neighbors becomes a live cell</li>
          </ul>
      </div>
    );
};

export default Rules;