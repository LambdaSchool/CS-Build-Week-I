import React from 'react';

const Rules = () => {
    return(
        <div>
            <h1>Rules:</h1>
            <h2>Survival:</h2>
            <p>If a cell is alive and has 2 or 3 living neighors, it survives and moves on to the next generation.</p>
            <h2>Birth:</h2>
            <p>If a cell is dead and has exactly 3 living neighbors, it comes to life in the next generation.</p>
            <h2>Death:</h2>
            <p>If a cell is alive and has less than 2 living neighbors or more than 3 living neighbors, it dies and is shown as a dead cell in the next generation.</p>
        </div>
    );
}

export default Rules;