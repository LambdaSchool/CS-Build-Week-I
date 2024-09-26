import React, { useState, useCallback, useRef } from "react";
import "./App.css";
import produce from "immer";

const numRows = 40;
const numCols = 40;

const operations = [
  [0, 1],
  [0, -1],
  [1, -1],
  [1, 0],
  [1, 1],
  [-1, 1],
  [-1, -1],
  [-1, 0],
];

const setDefaultGrid = () => {
  const rows = [];
  for (let i = 0; i < numRows; i++) {
    rows.push(Array(numCols).fill(0));
  }
  return rows;
};
function App() {
  const [grid, setGrid] = useState(() => {
    return setDefaultGrid();
  });
  const [running, setRunning] = useState(false);
  const [count, setCount] = useState(0);
  const runningRef = useRef(running);
  runningRef.current = running;

  const generator = useCallback(() => {
    if (!runningRef.current) {
      return;
    }
    setCount((count) => (count += 1));
    setGrid((g) => {
      return produce(g, (producedgrid) => {
        for (let i = 0; i < numRows; i++) {
          for (let j = 0; j < numCols; j++) {
            let neighbors = 0;
            operations.forEach(([x, y]) => {
              const newI = i + x;
              const newJ = j + y;
              if (newI >= 0 && newI < numRows && newJ >= 0 && newJ < numCols) {
                neighbors += g[newI][newJ];
              }
            }); //end of for each
            if (neighbors < 2 || neighbors > 3) {
              producedgrid[i][j] = 0;
            } else if (g[i][j] === 0 && neighbors === 3) {
              producedgrid[i][j] = 1;
            }
          } //end of second for loop
        } //end of first for loop
      }); //end of produce
    }); //end of the setgrid;

    setTimeout(generator, 100);
  }, []);

  return (
    <div className="App">
      <div className="left">
        <h1>Conway's Game Of Life</h1>
        <div className="ButtonContainer">
          <button
            className="Button"
            onClick={() => {
              setRunning(!running);
              if (!running) {
                runningRef.current = true;
                generator();
              }
            }}
          >
            {running ? "Pause" : "Play"}
          </button>
          <button
            className="Button"
            onClick={() => {
              setCount(0);
              setGrid(setDefaultGrid());
            }}
          >
            Reset
          </button>
          <button
            className="Button"
            onClick={() => {
              const rows = [];
              for (let i = 0; i < numRows; i++) {
                rows.push(
                  Array.from(Array(numCols), () =>
                    Math.random() > 0.5 ? 1 : 0
                  )
                );
              }

              setGrid(rows);
              setCount(1);
            }}
          >
            Random
          </button>
        </div>
        <div className="Rules"></div>
        <h2>Rules:</h2>
        <p>Any live cell with two or three live neighbours survives.</p>
        <p>Any dead cell with three live neighbours becomes a live cell.</p>
        <p>
          All other live cells die in the next generation. Similarly, all other
          dead cells stay dead.
        </p>
      </div>
      <div className="right">
        <h3>
          Generation:{"  "}
          {count}
        </h3>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: `repeat(${numCols},20px)`,
          }}
        >
          {grid.map((rows, rowIndex) =>
            rows.map((col, colIndex) => (
              <div
                key={`${rowIndex}-${colIndex}`}
                onClick={() => {
                  const newGrid = produce(grid, (producedgrid) => {
                    producedgrid[rowIndex][colIndex] = grid[rowIndex][colIndex]
                      ? 0
                      : 1;
                  });
                  setGrid(newGrid);
                }}
                style={{
                  width: 20,
                  height: 20,
                  backgroundColor: grid[rowIndex][colIndex] ? "black" : "white",
                  border: "solid 1px black",
                }}
              ></div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
