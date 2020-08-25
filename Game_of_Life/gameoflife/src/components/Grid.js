import React, { useState, useCallback, useRef } from 'react';
import produce from 'immer';

const Rows = 25;
const Col = 25;

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
    
        setTimeout(Populate, 1000);
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
                                backgroundColor: grid[x][y] ? "blue" : undefined,
                                border: 'solid 1px black'
                            }}
                        />
                    )
                )}
            </div>

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

            <button
                onClick={() => {
                    setGrid(clearGrid());
                }}
            >
                Clear Board
            </button>

            <button>
                +
            </button>

            <button>
                -
            </button>
        </>
    )
}

export default Grid;