import React, { useState, useCallback, useRef, useEffect } from 'react';
import produce from 'immer';
import { Dropdown } from 'react-bootstrap';

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

const randomGrid = () => {
    const rows = [];
    for (let i = 0; i < Rows; i++) {
        rows.push(Array.from(Array(Col), () => Math.random() > .7 ? 1 : 0));
    };
    // setGrid(rows);
    return rows;
};

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

    // UNCOMENT ONCE WORKING-------------------------------------------------------------
    const [color, setColor] = useState('black');

    const [start, setStart] = useState(false);
    const [gen, setGen] = useState(0);
    const [speed, setSpeed] = useState(500)
    // const speed = 500;

    // UNCOMMENT ONCE WORKING------------------------------------------
    // This is the function used to increase speed
    // const increaseSpeed = () => {
    //     setSpeed(speed + 10)

    //     console.log(speed)
    // }

    // // Used to decrease speed
    // const decreaseSpeed = () => {
    //     setSpeed(speed - 10)

    //     console.log(speed)
    // }

    // Randomize color
    // const changeColor = () => {
    //     setColor()
    // }

    const genRef = useRef(gen);
    genRef.current = gen;

    const runningRef = useRef(start);
    runningRef.current = start

    // This runs the game
    const Populate = useCallback(() => {
        setInterval(() => {
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
                                // making sure we are in the grid and not out of it
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
            });
            setGen(++genRef.current);
        })
        console.log("speed in pop")
    }, []);

    function handleChange(event) {
        setColor(event.target.value) 
        console.log(event)      
    };

    function handleSpeedChange(event) {
        setSpeed(event.target.value) 
        console.log("speed", event)      
    };

    function handleSubmit(event) {
        event.preventDefault();
    };

    function handleSpeedSubmit(event) {
        event.preventDefault();
    };

    function handleSelect(event) {
        setColor(event)
    };

    // setColor(hue) = {
	// 	switch (hue) {
	// 		case "1":
	// 			this.cols = 20;
	// 			this.rows = 10;
	// 		break;
	// 		case "2":
	// 			this.cols = 50;
	// 			this.rows = 30;
	// 		break;
	// 		default:
	// 			this.cols = 70;
	// 			this.rows = 50;
	// 	}
	// }

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
                        runningRef.current = !start;
                        Populate();
                    }
                }}
            >
                {start ? 'pause' : 'start'}
            </button>

            {/* Clear grid button */}
            <button
                onClick={() => {
                    setGrid(clearGrid())
                    setGen(gen === 0)
                    // setSpeed(speed === 500)
                }}
            >
                Clear Board
            </button>

            {/* Randomize button */}
            <button onClick={() => {
                setGrid(randomGrid());
            }}>
                Randomize
            </button>

            {/* Not working dynamic speed button */}
            {/* <div>
                Speed:
                <button onClick={increaseSpeed}> + </button>
                <button onClick={decreaseSpeed}> - </button>
            </div> */}

            <div>
                <form onSubmit={handleSpeedSubmit}>
                    <input
                        // type='text'
                        value={speed}
                        onChange={handleSpeedChange}
                    />
                </form>

                    Enter speed in ms
                    <input type="submit" value="Submit" />
            </div>

            <form onSubmit={handleSubmit}>
                <label>
                    Pick a color:
                    <select value={color} onChange={handleChange}>
                        <option value="red">Red</option>
                        <option value="blue">Blue</option>
                        <option value="green">Green</option>
                        <option value="pink">pink</option>
                    </select>
                </label>
                <input type="submit" value="Submit" />
            </form>

            <h2>Generation: {gen}</h2>
        </>
    )
}

export default Grid;