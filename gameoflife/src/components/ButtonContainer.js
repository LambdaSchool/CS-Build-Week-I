import React from 'react';
import Button from './Button';
import './index.css';

const ButtonContainer = props => {
  return (
    <div className="center">
      <Button 
        styles="btn btn-outline-dark mx-2 my-2 px-5"
        onClick={props.playButton} 
        text="Play" 
      />
      <Button 
        styles="btn btn-outline-dark mx-2 my-2 px-5" 
        onClick={props.pauseButton} 
        text="Pause" 
      />
      <Button 
        styles="btn btn-outline-dark mx-2 my-2 px-5" 
        onClick={props.clearButton} 
        text="Clear" 
      />
      <br />
      <Button 
        styles="btn btn-outline-dark mx-2 my-2 px-5"
        onClick={props.increaseSpeed} 
        text="Increase" 
      /> 
      {props.speed >= 100 && 
        <Button 
          styles="btn btn-outline-dark mx-2 my-2 px-5" 
          onClick={props.decreaseSpeed} 
          text="Decrease" 
        />   
      }
      <Button 
        styles="btn btn-outline-dark mx-2 my-2 px-5"
        onClick={props.handleConfig1} 
        text="Config1" 
      /> 
    </div>
  )
}

export default ButtonContainer;