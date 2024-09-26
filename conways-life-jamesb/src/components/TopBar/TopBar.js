import React from 'react';

export default function Grid(props) {
    return (
        <>
            <button onClick={() => props.startGame()}>Start Game</button>
            <button onClick={() => props.stopGame()}>Stop Game</button>
            <button onClick={() => {
                props.stopGame();
                props.nextGen();
            }}>Next Generation</button>
            <button onClick={() => props.increaseSpeed()}>Increase Game Speed</button>
            <button onClick={() => props.decreaseSpeed()}>Decrease Game Speed</button>

            
        </>
    )
}