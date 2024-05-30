import React, { Component } from 'react';
import './instructions.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faInfo, faTimes } from '@fortawesome/free-solid-svg-icons'



const Instructions = (props) => {

  window.setTimeout(()=>{
    let hdr = document.querySelector('.instructions-container');
    hdr.classList.add('show-container')
  }, 100);

  const closeInstructs = () => {
    let modal = document.querySelector('.instructions-container');
    modal.style.display = "none";
  }

  return (
    <div className="instructions-container">
      <div className="instr-header">
        <h2>Playing with lives.</h2>
        <FontAwesomeIcon className="exit" icon={faTimes} onClick={()=>{closeInstructs()}}/>
      </div>
      <div>Conway's "Game of Life" is a simulation created by a mathematician named John Conway.  The simulation is to display, in real-time, the ebb and flow of life and death. "Cells" represent living or dead entities.  And those entities live or die in accord to the number of "neighbors" they have.  In this instance of the <i>Game of Life</i>, a cell dies if a cell's qty of neighbors is <i>&gt;3</i> or <i>&lt;2</i>  In the inverse of that qty, a cell remains alive or comes to life.</div>
      <br></br>
      <div>
        So, click on this grid, bringing some cells to life, and hit play.  <i>Or,</i> click the "randomize" button to create a grid of life automatically.
      </div>
    </div>
  )
};

export default Instructions;


