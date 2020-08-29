import React, { useState, useCallback, useRef } from 'react';
import produce from 'immer';


// This component hold all logic and displays the grid

const Rows = 25;
const Col = 25;

// this is for finding the surrounding cells around an cell that is alive
const surround = [
    [0, 1],
    [0, -1],
    [1, 0],
    [1, 1],
    [1, -1],
    [-1, 0],
    [-1, 1],
    [-1, -1]
];

// Clearing grid. 
const clearGrid = () => {
    const rows = [];
    for (let i = 0; i < Rows; i++) {
        rows.push(Array.from(Array(Col), () => 0));
    };
    return rows;
}    

const Grid = () => {
    const [grid, setGrid] = useState(() => {
        return clearGrid();
    });

    const [start, setStart] = useState(false);
    const [interval, setInterval] = useState(500); // This state is used for increasing the speed of the cells
    const [color, setColor] = useState([
        "red",
        "orange",
        "yellow",
        "green",
        "cyan",
        "blue",
        "purple",
        "pink",
        "gray",
        "brown"
    ])

    // This is the function used to increase speed
    const increaseSpeed = () => {
        setInterval(interval - 10)

        console.log(interval)
    }

    // Used to decrease speed
    const decreaseSpeed = () => {
        setInterval(interval + 10)

        console.log(interval)
    }

    // Randomize color
    const changeColor = () => {
        setColor()
    }

    const runningRef = useRef();
    runningRef.current = start

    const Populate = useCallback(() => {
        if (!runningRef.current) {
            return;
        }

        setGrid((g) => {
            return produce(g, gridCopy => {
                for (let i = 0; i < Rows; i++) {
                    // checking for neighbors
                    for (let j = 0; j < Col; j++) {
                        let neighbors = 0;
                        surround.forEach(([x, y]) => {
                            const genI = i + x;
                            const genJ = j + y;
                            // making sure we are in the grib and not out of it
                            if (genI >= 0 && genI < Rows && genJ >= 0 && genJ < Col) {
                                 neighbors += g[genI][genJ]
                            }
                        })
    
                        // determines if a cell dies or is born depending on above condition
                        if (neighbors < 2 || neighbors > 3) {
                            gridCopy[i][j] = 0;
                        } else if (g[i][j] === 0 && neighbors === 3) {
                            gridCopy[i][j] = 1;
                        }                        
                          
                    }
                }
            })
        })
    
        setTimeout(Populate, interval);
    }, []);

    return (
        <>
            <div 
                style={{
                    display: 'grid',
                    gridTemplateColumns: `repeat(${Col}, 20px)`
                }}
            >
                {grid.map((rows, x) => 
                    rows.map((col, y) => 
                        <div
                            key={`${x}-${y}`}
                            onClick={() => {
                                const newGrid = produce(grid, gridClone => {
                                    gridClone[x][y] = grid[x][y] ? 0 : 1;
                                });
                                setGrid(newGrid);
                            }}
                            style={{ 
                                width: 20, 
                                height: 20,
                                backgroundColor: grid[x][y] ? color : undefined,
                                border: 'solid 1px black'
                            }}
                        />
                    )
                )}
            </div>

            {/* Button starts and pauses the simulation */}
            <button 
                onClick={() => {
                    setStart(!start);
                    if (!start) {
                        runningRef.current = true;
                        Populate();
                    }
                }}
            >
                {start ? 'pause' : 'start'}
            </button>

            {/* Clear grid button */}
            <button
                onClick={() => {
                    setGrid(clearGrid());
                }}
            >
                Clear Board
            </button>

            {/* Randomize button */}
            <button onClick={() => {
                const rows = [];
                for (let i = 0; i < Rows; i++) {
                    rows.push(Array.from(Array(Col), () => Math.random() > .7 ? 1 : 0));
                };
                setGrid(rows);
            }}>
                Randomize
            </button>

            {/* Not working speed button */}
            <div>
                Speed:
                <button onClick={increaseSpeed}> + </button>
                <button onClick={decreaseSpeed}> - </button>
            </div>

            <button onClick={changeColor}> Change Color </button>
        </>
    )
}

export default Grid;