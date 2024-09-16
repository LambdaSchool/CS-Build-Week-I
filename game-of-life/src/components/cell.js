import React from 'react';

export default ({alive, newBorn, running, handleClick}) =>
(
    <td
        onClick={running ? '' : handleClick}
        className={`${alive ? 'alive' : ''} ${newBorn ? 'new-born': ''}`}
     
    >
    </td>
  )