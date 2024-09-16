import React from 'react';

 function Inputs (props) {
  return (
    <div className='inputs'>
      <div className='buttons'>
        {props.isPlaying ? <button onClick={props.startHandler}>Stop</button> :
          <button onClick={props.startHandler}>Start</button>
        }
        <button onClick={props.stepHandler}>Step</button>
        <button onClick={props.clearHandler}>Clear</button>
        <button name='random' onClick={props.populate}>Random</button>
        <button name='glider' onClick={props.populate}>Glider</button>
        <button name='blinker' onClick={props.populate}>Blinker</button>
        <button name='pulsar' onClick={props.populate}>Pulsar</button>
      </div>
      <p>Generation: {props.gen}</p>
    </div>
  )
}

export default Inputs;
