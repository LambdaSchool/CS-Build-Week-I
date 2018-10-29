import React from "react";
import "./Board.css";

let cell_size = 40;
let board_width = 600;
let board_height = 600;
let rows = board_height / cell_size; // This gives us the number of rows that will be in our board.
let columns = board_width / cell_size;

class Board extends React.Component {
  constructor() {
    super();
    this.board = this.generateBoard(); // Create a board out of the rows and column sizes
    this.state = {
      cells: [],
      gridSize: "",
      isClickable: false,
      alive: false
    };
  }
  handleClick = event => {
    // This should handle whether the cell is alive (black) or dead (white).
    console.log("handleClick event is: ", event);
  };
  handleChange = event => {
    this.setState({ gridSize: event.target.value });
  };
  handleResize = event => {
    event.preventDefault();
    board_width = Number(this.state.gridSize);
    board_height = Number(this.state.gridSize);
    this.setState({});
  };

  generateBoard = () => {
    let cellGrid = [];
    for (let x = 0; x < columns; x++) {
      cellGrid[x] = []; // This will create an array of all of x axis of the board.
      for (let y = 0; y < rows; y++) {
        cellGrid[x][y] = false; // This will add to the cellGrid array, creating in each array, an array of y's.
      }
    }
    return cellGrid;
  };
  generateCells = () => {
    let cells = [];
    for (let x = 0; x < columns; x++) {
      for (let y = 0; y < rows; y++) {
        if (this.board[x][y]) {
          cells.push({ x, y });
        }
      }
    }
    return cells;
  };

  render() {
    {
      /*
    console.log("this.state.cells is: ", this.state.cells);
    console.log("this.state.gridSize is: ", this.state.gridSize);
  console.log("typeof board_width is: ", typeof board_width);*/
    }
    console.log("this.board is: ", this.board);
    console.log("this.gCells is: ", this.gCells);
    return (
      <div>
        <div
          className="Board"
          style={{
            width: board_width,
            height: board_height,
            backgroundSize: `${cell_size}px ${cell_size}px`
          }}
          onClick={this.handleClick}
        />
        <div className="dropdown">
          <button
            className="btn btn-secondary dropdown-toggle"
            type="button"
            id="dropdownMenuButton"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            Presets
          </button>
          <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
            <a className="dropdown-item" href="#">
              Block
            </a>
            <a className="dropdown-item" href="#">
              Beehive
            </a>
            <a className="dropdown-item" href="#">
              Loaf
            </a>
            <a className="dropdown-item" href="#">
              Boat
            </a>
            <a className="dropdown-item" href="#">
              Tub
            </a>
          </div>
        </div>
        <form>
          <input placeholder="Change grid size to" onChange={this.handleChange} />
          <button onClick={this.handleResize}>Change</button>
        </form>
      </div>
    );
  }
}

export default Board;
