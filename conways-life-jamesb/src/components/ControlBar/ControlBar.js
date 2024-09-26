import React from 'react';

export default function Grid(props) {
    return (
        <>
            <button onClick={() => {
                props.stopGame();
                props.gridReset(15);
            }}>15x15</button>
            <button onClick={() => {
                props.stopGame();
                props.gridReset(30);
            }}>30x30</button>
            <button onClick={() => {
                props.stopGame();
                props.gridReset(45);
            }
            }>45x45</button>
            <button onClick={() => {
                props.stopGame();
                props.gridReset(60);
            }}>60x60</button>
            <button onClick={() => {
                props.stopGame();
                props.randomizeGrid();
            }}>Randomize!</button>
            <button onClick={() => {
                props.stopGame();
                props.clearGrid();
            }}>Clear Grid!</button>
            <button onClick={() => {
                props.gridReset(15);
                props.robotPreset();
            }}>Preset Grid: Robot</button>
        </>
    )
}