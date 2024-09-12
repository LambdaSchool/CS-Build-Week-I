import React, { Component } from "react";
import "./App.css";

class App extends Component {
  state = {
    matrix: {}, //using this for the grid.
    //grid set up
    matrixMirror: {}, //using for clearing the grid will be set to a all dead cell grid.
    matrixUsing: [], //using this to iterate over and show the grid on the screen.
    mirror: [], // mirror for clearing the grid.
    row_count: 15, //default amount of rows on the grid can be changed.
    col_count: 15, //default amount of columns on the grid can be changed.

    width: "330px", //width of the grid can be changed.
    //presets
    //cell choices
    if_one_color: "black", // if one the cell is alive
    if_zero_color: "white", // if zero the cell is dead
    //game instructions
    gameRunning: false, //used to show game has started.
    generation: 0, // keeps count of generations
    gameSpeed: 125 // default game speed can be changed.
  };

  componentWillMount() {
    this.setMatrixUp();
  }

  reset = () => {
    //resets gameRunning and generation count.
    this.setState({ generation: 0, gameRunning: false });
    // this.updateRowCol();
    this.setMatrixUp();
  };

  generateRandom = () => {
    //generates a random grid to start with.
    const keys = Object.keys(this.state.matrix);
    const matrix = { ...this.state.matrixMirror }; //creates a copy

    for (let i = 0; i < keys.length; i++) {
      for (let j = 0; j < matrix[i].length; j++) {
        const grabRandom = Math.random();
        const convertToNumber = grabRandom * 2;

        const floorNumber = Math.floor(convertToNumber);

        if (floorNumber === 1) {
          matrix[i][j] = 1;
        } else {
          matrix[i][j] = 0;
        }
      }
    }
    this.setState({ matrix });
    this.continueWithGame();
  };

  setMatrixUp = () => {
    const matrixUsing = [];
    let count = 0;
    let beginRow = 0;
    let beginColumn = 0;
    const matrix = {};
    while (beginRow < this.state.row_count) {
      beginColumn = 0;
      matrix[beginRow] = [];
      while (beginColumn < this.state.col_count) {
        matrix[beginRow].push(0);
        // beginColumn++;

        const temp_hash = {
          row: 0,
          position_in_row: 0,
          actual_number: 0,
          color: this.state.if_zero_color
        };
        temp_hash.row = beginRow;
        temp_hash.position_in_row = beginColumn;
        temp_hash.actual_number = count;
        temp_hash.value = 0; //just to get rid of the warning.
        matrixUsing.push(temp_hash);
        count++;
        beginColumn++;
      }
      beginRow++;
    }
    
    const width_size = 22 * this.state.col_count;
    const width = `${width_size}px`;

    this.setState({
      matrix,
      matrixUsing,
      width,
      matrixMirror: matrix,
      mirror: matrixUsing
    });
    return true; // means its finished.
  };
  continueWithGame = () => {
    const matrixUsing = [];
    const matrix = { ...this.state.matrix }; //creates a copy
    let count = 0;

    Object.entries(matrix).forEach(entry => {
      for (let x of entry[1]) {
        const temp_hash = {
          row: 0,
          position_in_row: 0,
          actual_number: 0,
          color: this.state.if_zero_color
        };
        temp_hash.row = Number(entry[0]);
        temp_hash.position_in_row = count % this.state.col_count;
        temp_hash.actual_number = count;
        temp_hash.value = x; //just to get rid of the warning.
        matrixUsing.push(temp_hash);
        count++;
      }
    });

    this.setState({ matrix, matrixUsing });
  };

  manualTurnOnOrOff = (row, position_in_row) => {
    //Just add 1 to the % of 2  it will provide 0 or 1. The conditional is already set up on the div to set the div to the correct class based off the value
    if (this.state.gameRunning === false) {
      const matrix = this.state.matrix;
      // matrix[row][position_in_row] = matrix[row][position_in_row] === 0 ? this.state.if_one_color: this.state.if_zero_color;
      matrix[row][position_in_row] = matrix[row][position_in_row] === 0 ? 1 : 0;
      this.setState({ matrix });
    }
  };
  // Game functions being declared below this line.

  handleChange = event => {
    //Will handle changing the columns. and columns
    //function allows user to change the amount of columns that is being used.
    this.setState({ [event.target.name]: event.target.value });
  };


  runGamne = () => {
    this.nextGeneration();
  };

  startTheGame = () => {
    //Function will start the game.
    console.log(this.state.gameRunning);
    if (this.state.gameRunning === false) {
      // let intervalRef = setInterval(this.runGamne(), 1000); will only run one time. Not a loop.
      let intervalRef = setInterval(
        () => this.runGamne(),
        this.state.gameSpeed
      );
      this.setState({
        gameRunning: true,
        intervalRef
      });
    }
  };
  stopTheGame = () => {
    // //Function will stop the game.
    clearInterval(this.state.intervalRef);
    this.setState(prevState => ({ gameRunning: !prevState.gameRunning }));
  };

  nextGeneration = () => {
    //functionaly for gameplay goes here
    const matrix = this.state.matrixUsing.slice();
    const state_matrix = { ...this.state.matrix }; //creates a copy

    for (let i = 0; i < matrix.length; i++) {
      let aliveNeighbors = this.findLiveNeighbors({
        row: matrix[i].row,
        position_in_row: matrix[i].position_in_row
      });
      let current_cell_alive =
        this.state.matrix[matrix[i].row][matrix[i].position_in_row] === 1
          ? true
          : false;
      if (current_cell_alive) {
        if (aliveNeighbors < 2 || aliveNeighbors > 3) {
          //kill the cell that is currently alive.
          state_matrix[matrix[i].row][matrix[i].position_in_row] = 0;
        }
      } else {
        if (aliveNeighbors === 3) {
          //resurrect the currently dead cell.
          state_matrix[matrix[i].row][matrix[i].position_in_row] = 1;
        }
      }
    }

    this.setState(prevState => ({
      matrix: state_matrix,
      generation: prevState.generation + 1
    }));
    this.continueWithGame();
  };

  handleColorChangeIfZero = color => {
    this.setState({ if_zero_color: color });
  };

  handleColorChangeIfOne = color => {
    this.setState({ if_one_color: color });
  };

  findLiveNeighbors = position => {
    //find neighbors of the live cell to use the rules on.
    //position should be an object featuring  the row and  position in row.
    //A neighbor will be  to the left to the right  up down and diagonal  which will be up to the left, up to the right and down to the left down to the right.
    let totalAlive = 0;

    let lookUp = true;
    let lookDown = true;
    let lookRight = true;
    let lookLeft = true;

    //logic for if I should look up or down.
    if (position.row === 0) {
      lookUp = false;
    } else if (position.row === this.state.row_count - 1) {
      lookDown = false;
    }

    //logic for if I should look right or left.
    if (position.position_in_row === 0) {
      lookLeft = false;
    } else if (position.position_in_row === this.state.col_count - 1) {
      lookRight = false;
    }
    if (lookUp) {
      if (this.state.matrix[position.row - 1][position.position_in_row] === 1) {
        totalAlive++;
      }
    }

    if (lookDown) {
      if (this.state.matrix[position.row + 1][position.position_in_row] === 1) {
        totalAlive++;
      }
    }

    if (lookRight) {
      if (this.state.matrix[position.row][position.position_in_row + 1] === 1) {
        //next in line plus one//2
        totalAlive++;
      }
    }

    if (lookLeft) {
      if (this.state.matrix[position.row][position.position_in_row - 1] === 1) {
        //4
        totalAlive++;
      }
    }

    if (lookUp && lookRight) {
      if (
        this.state.matrix[position.row - 1][position.position_in_row + 1] === 1
      ) {
        //3
        totalAlive++;
      }
    }

    if (lookUp && lookLeft) {
      //diagonal left up one minus one //5
      if (
        this.state.matrix[position.row - 1][position.position_in_row - 1] === 1
      ) {
        totalAlive++;
      }
    }

    if (lookDown && lookRight) {
      //down one to the right (plus one) //7
      if (
        this.state.matrix[position.row + 1][position.position_in_row + 1] === 1
      ) {
        totalAlive++;
      }
    }

    if (lookDown && lookLeft) {
      //down one to the left (minus one) //8
      if (
        this.state.matrix[position.row + 1][position.position_in_row - 1] === 1
      ) {
        totalAlive++;
      }
    }
    return totalAlive;
  };

  presetChange = type => {
    const finished = this.setMatrixUp(); //will reset the grid before setting it up.

    let row_index = 0;
    let col_index = 0;
    if (finished) {
      const matrix = { ...this.state.matrixMirror }; //creates a copy
      if (Object.keys(matrix).length) {
        switch (type) {
          case "Block":
            this.setMatrixUp(); //will reset the grid before setting it up.
            row_index =
              this.state.row_count % 2 === 0
                ? this.state.row_count / 2
                : (this.state.row_count - 1) / 2;
            col_index =
              this.state.col_count % 2 === 0
                ? this.state.col_count / 2
                : (this.state.col_count - 1) / 2;
            matrix[row_index][col_index] = 1;
            matrix[row_index - 1][col_index] = 1;
            matrix[row_index - 1][col_index - 1] = 1;
            matrix[row_index][col_index - 1] = 1;
            this.setState({ matrix }, () => {
              this.continueWithGame();
            });

            break;
          case "Beehive":
            row_index =
              this.state.row_count % 2 === 0
                ? this.state.row_count / 2
                : (this.state.row_count - 1) / 2;
            col_index =
              this.state.col_count % 2 === 0
                ? this.state.col_count / 2
                : (this.state.col_count - 1) / 2;
            matrix[row_index][col_index] = 1;
            matrix[row_index][col_index - 1] = 1;
            matrix[row_index - 1][col_index - 2] = 1;
            matrix[row_index - 2][col_index] = 1;
            matrix[row_index - 2][col_index - 1] = 1;
            matrix[row_index - 1][col_index + 1] = 1;

            this.setState({ matrix }, () => {
              this.continueWithGame();
            });
            break;
          case "Loaf":
            row_index =
              this.state.row_count % 2 === 0
                ? this.state.row_count / 2
                : (this.state.row_count - 1) / 2;
            col_index =
              this.state.col_count % 2 === 0
                ? this.state.col_count / 2
                : (this.state.col_count - 1) / 2;
            matrix[row_index][col_index] = 1;
            matrix[row_index - 1][col_index] = 1;
            matrix[row_index + 1][col_index - 1] = 1;
            matrix[row_index][col_index - 2] = 1;
            matrix[row_index - 1][col_index - 3] = 1;
            matrix[row_index - 2][col_index - 2] = 1;
            matrix[row_index - 2][col_index - 1] = 1;

            this.setState({ matrix }, () => {
              this.continueWithGame();
            });
            break;
          case "Boat":
            row_index =
              this.state.row_count % 2 === 0
                ? this.state.row_count / 2
                : (this.state.row_count - 1) / 2;
            col_index =
              this.state.col_count % 2 === 0
                ? this.state.col_count / 2
                : (this.state.col_count - 1) / 2;
            matrix[row_index - 1][col_index] = 1;
            matrix[row_index - 1][col_index - 2] = 1;
            matrix[row_index - 2][col_index - 2] = 1;
            matrix[row_index - 2][col_index - 1] = 1;
            matrix[row_index][col_index - 1] = 1;
            this.setState({ matrix }, () => {
              this.continueWithGame();
            });
            break;
          case "Tub":
            row_index =
              this.state.row_count % 2 === 0
                ? this.state.row_count / 2
                : (this.state.row_count - 1) / 2;
            col_index =
              this.state.col_count % 2 === 0
                ? this.state.col_count / 2
                : (this.state.col_count - 1) / 2;
            matrix[row_index - 1][col_index] = 1;
            matrix[row_index - 1][col_index - 2] = 1;
            matrix[row_index - 2][col_index - 1] = 1;
            matrix[row_index][col_index - 1] = 1;
            this.setState({ matrix }, () => {
              this.continueWithGame();
            });
            break;
          case "Jon":
            matrix[2][1] = 1;
            matrix[2][2] = 1;
            matrix[2][3] = 1;
            matrix[3][3] = 1;
            matrix[4][3] = 1;
            matrix[5][3] = 1;
            matrix[6][3] = 1;
            matrix[6][2] = 1;
            matrix[6][1] = 1;
            matrix[6][0] = 1;
            matrix[5][0] = 1;
            //above is J
            matrix[2][6] = 1;
            matrix[2][7] = 1;
            matrix[2][8] = 1;
            matrix[3][6] = 1;
            matrix[4][6] = 1;
            matrix[5][6] = 1;
            matrix[6][6] = 1;
            matrix[6][7] = 1;
            matrix[6][8] = 1;
            matrix[5][8] = 1;
            matrix[4][8] = 1;
            matrix[3][8] = 1;
            //above is o
            matrix[2][11] = 1;
            matrix[2][12] = 1;
            matrix[2][13] = 1;
            matrix[3][11] = 1;
            matrix[4][11] = 1;
            matrix[5][11] = 1;
            matrix[6][11] = 1;
            matrix[3][13] = 1;
            matrix[4][13] = 1;
            matrix[5][13] = 1;
            matrix[6][13] = 1;
            this.setState({ matrix }, () => {
              this.continueWithGame();
            });
            break;
          case "Blinker 1":
            row_index =
              this.state.row_count % 2 === 0
                ? this.state.row_count / 2
                : (this.state.row_count - 1) / 2;
            col_index =
              this.state.col_count % 2 === 0
                ? this.state.col_count / 2
                : (this.state.col_count - 1) / 2;
            matrix[row_index][col_index] = 1;
            matrix[row_index - 1][col_index] = 1;
            matrix[row_index + 1][col_index] = 1;

            this.setState({ matrix }, () => {
              this.continueWithGame();
            });
            break;
          case "Blinker 2":
            row_index =
              this.state.row_count % 2 === 0
                ? this.state.row_count / 2
                : (this.state.row_count - 1) / 2;
            col_index =
              this.state.col_count % 2 === 0
                ? this.state.col_count / 2
                : (this.state.col_count - 1) / 2;
            matrix[row_index][col_index] = 1;
            matrix[row_index][col_index - 1] = 1;
            matrix[row_index][col_index + 1] = 1;
            this.setState({ matrix }, () => {
              this.continueWithGame();
            });
            break;
          default:
            console.log("That type doesn't exist"); //only for react warning purposes this won't actually hit.
        }
      }
    }
  };

  decrementSpeed = () => {
    if (this.state.gameSpeed > 125) {
      this.setState(prevState => ({ gameSpeed: prevState.gameSpeed - 1 }));
    }
  };

  incrementSpeed = () => {
    if (this.state.gameSpeed < 2000) {
      this.setState(prevState => ({ gameSpeed: prevState.gameSpeed + 1 }));
    }
  };

  render() {
    const matrix = this.state.matrixUsing.slice();

    return (
      <div className="container" style={{ width: this.state.width }}>
        <h2 className="titleApp">Conway's Game of Life</h2>
        <p>
          Rules: • If a cell is alive and it has exactly 2 or 3 living
          neighbors, it stays alive. • If a cell is dead and it has exactly 3
          living neighbors, it rises again.
        </p>
        <p>Click random then start or one of the presets then start. YOu can pause or stop. You can also click on some of the cells to make them alive then click next for one generation or start for automatic generation.</p>
        <h4 className="titleApp">Generation : {this.state.generation}</h4>
        <div className="topButtons">
          <div>
            <button onClick={this.startTheGame}>Start</button>{" "}
          </div>
          <div>
            <button onClick={this.stopTheGame}>Stop</button>
          </div>
          <div>
            <button onClick={this.reset}>Clear</button>
          </div>
          <div>
            <button onClick={this.generateRandom}>Random</button>
          </div>
          <div>
            <button onClick={this.nextGeneration}>Next</button>
          </div>
          <br />
          <br />
          <br />
        </div>
        {matrix.map((hash, id) => (
          <div
            key={id}
            onClick={() =>
              this.manualTurnOnOrOff(hash.row, hash.position_in_row)
            }
            style={{
              background:
                this.state.matrix[hash.row][hash.position_in_row] === 0
                  ? this.state.if_zero_color
                  : this.state.if_one_color,
              color:
                this.state.matrix[hash.row][hash.position_in_row] === 0
                  ? this.state.if_zero_color
                  : this.state.if_one_color
            }}
            className={
              this.state.matrix[hash.row][hash.position_in_row] === 0
                ? "offDiv gridDiv"
                : "onDiv gridDiv"
            }
          >
            {hash.position_in_row}
          </div>
        ))}

        <div>
          <h5>Presets</h5>
          <div className="presetsDiv">
            <p onClick={() => this.presetChange("Block")}>Block</p>
            <p onClick={() => this.presetChange("Beehive")}>Beehive</p>
            <p onClick={() => this.presetChange("Loaf")}>Loaf</p>
            <p onClick={() => this.presetChange("Boat")}>Boat</p>
            <p onClick={() => this.presetChange("Tub")}>Tub</p>
            <p onClick={() => this.presetChange("Jon")}>Jon</p>
          </div>

          <h5>Current Speed {this.state.gameSpeed}</h5>
          <p>Stop the game and then click start to notice speed change.</p>
          <div className="presetsDiv">
            <input
              type="range"
              min="125"
              max="2000"
              value={this.state.gameSpeed}
              className="slider"
              id="myRange"
              name="gameSpeed"
              onChange={this.handleChange}
            />
          </div>

          <div className="slidecontainer">
            <h5>Row Count {this.state.row_count}</h5>
            <input
              type="range"
              min="15"
              max="30"
              value={this.state.row_count}
              className="slider"
              id="myRange"
              name="row_count"
              onChange={this.handleChange}
            />
            <h5>Col Count {this.state.col_count}</h5>
            <input
              type="range"
              min="15"
              max="30"
              value={this.state.col_count}
              className="slider"
              id="myRange"
              name="col_count"
              onChange={this.handleChange}
            />
            <p>Click update grid to set the row and column size</p>
            <button onClick={this.setMatrixUp}>Update Grid</button>
            <br />
            <h5> Dead Color: {this.state.if_zero_color}</h5>
            <div className="colorChoices">
              <div
                className="divcolor white"
                onClick={() => this.handleColorChangeIfZero("white")}
              >
                w
              </div>
              <div
                className="divcolor black"
                onClick={() => this.handleColorChangeIfZero("black")}
              >
                b
              </div>
              <div
                className="divcolor blue"
                onClick={() => this.handleColorChangeIfZero("blue")}
              >
                bl
              </div>
              <div
                className="divcolor green"
                onClick={() => this.handleColorChangeIfZero("green")}
              >
                g
              </div>
              <div
                className="divcolor orange"
                onClick={() => this.handleColorChangeIfZero("orange")}
              >
                o
              </div>
              <div
                className="divcolor purple"
                onClick={() => this.handleColorChangeIfZero("purple")}
              >
                pu
              </div>
              <div
                className="divcolor pink"
                onClick={() => this.handleColorChangeIfZero("pink")}
              >
                pk
              </div>
              <div
                className="divcolor yellow"
                onClick={() => this.handleColorChangeIfZero("yellow")}
              >
                y
              </div>
            </div>
            <h5> Alive Color: {this.state.if_one_color}</h5>
            <div className="colorChoices">
              <div
                className="divcolor white"
                onClick={() => this.handleColorChangeIfOne("white")}
              >
                w
              </div>
              <div
                className="divcolor black"
                onClick={() => this.handleColorChangeIfOne("black")}
              >
                b
              </div>
              <div
                className="divcolor blue"
                onClick={() => this.handleColorChangeIfOne("blue")}
              >
                bl
              </div>
              <div
                className="divcolor green"
                onClick={() => this.handleColorChangeIfOne("green")}
              >
                g
              </div>
              <div
                className="divcolor orange"
                onClick={() => this.handleColorChangeIfOne("orange")}
              >
                o
              </div>
              <div
                className="divcolor purple"
                onClick={() => this.handleColorChangeIfOne("purple")}
              >
                p
              </div>
              <div
                className="divcolor pink"
                onClick={() => this.handleColorChangeIfOne("pink")}
              >
                pk
              </div>
              <div
                className="divcolor yellow"
                onClick={() => this.handleColorChangeIfOne("yellow")}
              >
                y
              </div>
            </div>
          </div>
          <br />
          <br />
          <br />
          <br />
          <br />
          <h5>About Conway's Game</h5>
          <p>
            The game was devised by John Horton Conway in 1970. It is a cellular
            automaton where each cell is in one of finite number of states. For
            example the states for the cells in this program is dead or alive.
            The basics of celluar automaton is to use complex systems composed
            of simple units. This program is turing completre which basically is
            saying that the different generations can be simulated. What this
            means if we start off at the same exact grid it will eventaully get
            to a certain state that we can predict with 100% certainity. Take
            the presets for example, the first 5 do not change. However Jon
            changes and gets to about 110 before being unchangeable. This state
            can be simulated and predicted. Turing completness comes from turing
            machines. A turing machine can take a set of rules and determine a
            result from a set of variables inputed. Thus the grid if it starts
            off as ABC567 and we have rules stating what each input should
            change to next we can predict what the input will be after x amount
            of generations.
          </p>
        </div>
      </div>
    );
  }
}

export default App;
