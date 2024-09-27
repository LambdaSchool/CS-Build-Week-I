import React, { Component } from "react";
import "./grid.css";

let gen_count = 0;

class Grid extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cell_size: 20,
      grid_width_cells: 15,
      grid_height_cells: 15,
      grid: [],
      grid_empty: true,
      game_running: false,
      speed: 300
    };
  }

  componentDidMount() {
    requestAnimationFrame(this.tick);

    //set grid array size and set all values to false
    this.grid_init(this.state.grid_width_cells, this.state.grid_height_cells);
  }

  draw_grid() {
    let size = this.state.cell_size;
    let height = this.state.grid_height_cells * size;
    let width = this.state.grid_width_cells * size;

    let canvas = this.refs.canvas.getContext("2d");

    canvas.lineWidth = 1;
    canvas.strokeRect(0, 0, width, height);

    for (let y = size; y < height; y += size) {
      canvas.moveTo(0, y);
      canvas.lineTo(width, y);
    }

    for (let x = size; x < width; x += size) {
      canvas.moveTo(x, 0);
      canvas.lineTo(x, height);
    }

    canvas.strokeStyle = "black";
    canvas.lineWidth = 0.5;
    canvas.stroke();
  }

  tick = () => {
    if (this.state.game_running) {
      this.grid_update();
      this.grid_update_draw();
      requestAnimationFrame(this.step);
    }
  };

  step = () => {
    setTimeout(this.tick, this.state.speed);
  };

  //initialize the grid with the proper height and width and all false values.
  grid_init(width, height) {
    const grid = [];
    for (let y = 0; y < height; y++) {
      grid[y] = [];
      for (let x = 0; x < width; x++) {
        grid[y][x] = false;
      }
    }
    this.setState({ grid }, () => this.draw_grid());
  }

  //create a new grid based on the game rules being applied to the current grid, then setting the new grid to the current grid in state.
  grid_update = () => {
    const grid = new Array(this.state.grid_height_cells)
      .fill(0)
      .map(x => new Array(this.state.grid_width_cells).fill(false));
    const neighbors = [
      [-1, -1],
      [-1, 0],
      [-1, 1],
      [0, 1],
      [1, 1],
      [1, 0],
      [1, -1],
      [0, -1]
    ];
    let counter = 0;
    for (let y = 0; y < this.state.grid_height_cells; y++) {
      for (let x = 0; x < this.state.grid_width_cells; x++) {
        for (let i = 0; i < neighbors.length; i++) {
          const neighbor = neighbors[i];
          let y1 = y + neighbor[0];
          let x1 = x + neighbor[1];
          if (
            x1 >= 0 &&
            x1 < this.state.grid_width_cells &&
            y1 >= 0 &&
            y1 < this.state.grid_height_cells &&
            this.state.grid[y1][x1]
          ) {
            counter++;
          }
        }
        if (this.state.grid[y][x]) {
          if (counter === 2 || counter === 3) {
            grid[y][x] = true;
          }
        } else {
          if (counter === 3) {
            grid[y][x] = true;
          }
        }
        counter = 0;
      }
    }
    this.setState({ grid });
    gen_count++;
  };

  get_cursor = event => {
    if (this.props.game_running) {
      return;
    }
    let canvas = this.refs.canvas;
    let top = canvas.offsetTop;
    let left = canvas.offsetLeft;
    let x = event.clientX - left;
    let y = event.clientY - top;
    let cellSize = this.state.cell_size;
    let currentsquareX = Math.floor(x / cellSize);
    let currentsquareY = Math.floor(y / cellSize);
    let grid = this.state.grid.slice(0);
    if (grid[currentsquareY][currentsquareX] === true) {
      grid[currentsquareY][currentsquareX] = false;
    } else {
      grid[currentsquareY][currentsquareX] = true;
    }
    this.setState({ grid }, () => this.grid_update_draw());
  };

  grid_update_draw = () => {
    let canvas = this.refs.canvas.getContext("2d");
    for (let y = 0; y < this.state.grid_height_cells; y++) {
      for (let x = 0; x < this.state.grid_width_cells; x++) {
        if (this.state.grid[y][x] === true) {
          canvas.fillStyle = "green";
          canvas.fillRect(
            x * this.state.cell_size + 1,
            y * this.state.cell_size + 1,
            this.state.cell_size - 2,
            this.state.cell_size - 2
          );
        } else {
          canvas.clearRect(
            x * this.state.cell_size + 1,
            y * this.state.cell_size + 1,
            this.state.cell_size - 2,
            this.state.cell_size - 2
          );
        }
      }
    }
  };

  start_game = () => {
    if (!this.state.game_running) {
      this.setState({
        game_running: true
      });
      gen_count++;
    }
    requestAnimationFrame(this.tick);
  };

  stop_game = () => {
    this.setState({
      game_running: false
    });
  };

  grid_reset = () => {
    // this.setState({ game_running: false });
    this.stop_game();
    const grid = this.state.grid;
    for (let y = 0; y < this.state.grid_height_cells; y++) {
      for (let x = 0; x < this.state.grid_width_cells; x++) {
        grid[y][x] = false;
      }
    }
    this.setState({ grid });
    this.grid_update_draw();
    gen_count = 0;
  };

  next_step = () => {
    this.stop_game();
    this.grid_update();
    this.grid_update_draw();
    requestAnimationFrame(this.tick);
  };

  random_board = () => {
    const grid = this.state.grid;
    for (let y = 0; y < this.state.grid_height_cells; y++) {
      for (let x = 0; x < this.state.grid_width_cells; x++) {
        if (Math.floor(Math.random() * 10) + 1 <= 5) {
          grid[y][x] = false;
        } else {
          grid[y][x] = true;
        }
      }
    }
    this.setState({ grid });
    this.grid_update_draw();
  };

  resize_grid(width, height) {
    const grid = [];
    for (let y = 0; y < height; y++) {
      grid[y] = [];
      for (let x = 0; x < width; x++) {
        grid[y][x] = false;
      }
    }
    this.setState({ grid });
    this.grid_update_draw();
  }

  handleDimensionChange = event => {
    this.setState({ [event.target.name]: Number(event.target.value) });
  };

  render() {
    return (
      <div className="game-container">
        <div className="grid-container">
          <div className="gen-counter">
            <h3>Generation: {gen_count}</h3>
          </div>
          <div className="grid-change">
            <h5>Change Grid Dimensions: </h5>
            Width:
            <input
              type="number"
              min="3"
              max="40"
              placeholder="Width"
              onChange={this.handleDimensionChange}
              name="grid_width_cells"
              value={this.state.grid_width_cells}
            />
            Height:
            <input
              type="number"
              min="3"
              max="40"
              placeholder="Height"
              onChange={this.handleDimensionChange}
              name="grid_height_cells"
              value={this.state.grid_height_cells}
            />
            <button
              className="submit"
              onClick={() =>
                this.grid_init(
                  this.state.grid_width_cells,
                  this.state.grid_height_cells
                )
              }
            >
              Set
            </button>
          </div>
          <div className="control-buttons">
            <button className="submit" onClick={this.random_board}>
              Randomize
            </button>
            <button className="submit" onClick={this.next_step}>
              Next
            </button>
            <button className="submit" onClick={this.start_game}>
              Start
            </button>
            <button className="submit" onClick={this.stop_game}>
              Stop
            </button>
            <button className="submit" onClick={this.grid_reset}>
              Clear
            </button>
          </div>
          <div className="canvas">
            <canvas
              id="canvas"
              ref="canvas"
              width={this.state.grid_width_cells * this.state.cell_size}
              height={this.state.grid_height_cells * this.state.cell_size}
              onClick={this.get_cursor}
            />
          </div>
        </div>
        <div className="extras-container">
          <div className="rules">
            <h3>Game Rules</h3>
            <div className="rules-body">
              <ul>
                <li>
                  If the cell is alive **and** has 2 or 3 neighbors, then it
                  remains alive. Else it dies.
                </li>
                <li>
                  If the cell is dead **and** has exactly 3 neighbors, then it
                  comes to life. Else if remains dead.
                </li>
              </ul>
            </div>
          </div>
          <div className="about">
            <h3>About Conway's Game of Life</h3>
            <div className="about-body">
              <p>
                In this learning project we explore Conway's Game of Life. The
                game involves an (infinite) two-dimensional grid with black and
                white squares, which may be represented as 1 and 0. One may
                think of them as "live cells" or "dead cells". The grid evolves.
                The evolution rule is as follows:
              </p>
              <ul>
                <li>All cells evolve simultaneously</li>
                <li>Each cell has eight neighbours</li>
                <li>
                  An alive cell with two or three neighbours continues to live.
                  Otherwise it dies.
                </li>
                <li>
                  A dead cell with exactly three neighbours will become alive.
                </li>
              </ul>
              <p>
                From these simple forms it is possible to create stable and
                recursive patterns, such as the Gosper Glider Gun (illustrated).
              </p>
              <p>
                The Game of Life is a prototypical example of a cellular
                automaton, an automatic machine of cells. It has attracted the
                interest of researchers in diverse fields. Patterns in Conway's
                Game of Life have been shown to be capable of emulating a
                universal Turing machine.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default Grid;
