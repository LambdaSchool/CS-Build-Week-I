import React, { Component } from 'react';
import { Link, Route } from 'react-router-dom';
import { ButtonToolbar, MenuItem, DropdownButton } from 'react-bootstrap';
import Rules from './Rules';
import About from './About';
import './App.css';

class Box extends Component {
  // arrow function to select a box by row and column
  selectBox = () => {
    this.props.selectBox(this.props.row, this.props.col);
  }

  render(){
    return(
      <div
          className = {this.props.boxClass}
          id = {this.props.id}
          onClick = {this.selectBox}
      />
    );
  }
}

class Grid extends Component{

  render(){
    //set a constant width equal to the number columns, consider the border which is one pixel
    const width = this.props.cols * 14;
    //array of all rows in the grid
    let rowArray = []; //add everything that will show up in the grid to this array

    let boxClass = "";
    // get this.props.rows and this.props.cols from parent "App"
    for(let i = 0; i < this.props.rows; i++) {
      // looping over the columns in each row
      for (let j = 0; j < this.props.cols; j++) {
        let boxId = i + "_" + j; // the id that goes with each box element the first box id would be 1_1

        //get this.props.gridFull from parent App component
        //ternary operator to identify the status of the box as on or off, fill the box to indicate "on" state
        boxClass = this.props.gridFull[i][j] ? "box on" : "box off";
        // push the box component into the array
        rowArray.push(
          <Box
            boxClass = {boxClass}
            key = {boxId}
            boxId = {boxId}
            row = {i}
            col = {j}
            selectBox = {this.props.selectBox}
            />
        )
      }
    }

    return (
      //this inline style will allow for a variable width
      <div className = "grid" style = {{width: width}}>
        {rowArray}
      </div>
    );
  }
}

class Controls extends Component{

  handleGridSize = (event) => {
    this.props.gridSize(event);
  }

  render () {
    return(
      <div className = "controls">
        <h4>
          Game Controls
        </h4>
        <ButtonToolbar>
        <button className = "play-button" onClick = {this.props.playButton}>
          Play
        </button>
        <button className = "pause-button" onClick = {this.props.pauseButton}>
          Stop
        </button>
        <button className = "clear-button" onClick = {this.props.clearButton}>
          Reset
        </button>
        <button className = "random-pattern" onClick = {this.props.random}>
          Random
        </button>
        <button onClick = {this.props.slow}>
          Slower
        </button>
        <button onClick = {this.props.fast}>
          Faster
        </button>
        </ButtonToolbar>
      </div>

    );
  }
}



class App extends Component {
  constructor() {
    super();

    // these variables will not be accessible to other components
    // define these outside of state so we can reference them within the state
    this.rows = 30;
    this.cols = 50;

    this.speed = 400;

    this.state = {
      generation: 0, //this variable serves as a counter to track which generation the game is on
      /* create an array the size of the row variable and fill it with a map containing an array
      the size of the columns variable where each element in that array is false (cells start as turned-off)
      */
      gridFull: Array(this.rows).fill().map(() => Array(this.cols).fill(false))

    }
  }

  selectBox = (row, col) => {
    // make a copy so that we are not updating state directly
    let gridCopy = arrayClone(this.state.gridFull);
    // find the box that was clicked and set it's state to the opposite of what it was
    gridCopy[row][col] = !gridCopy[row][col];
    // now update the state to be the grid copy
    this.setState({
      gridFull: gridCopy
    });
  }

  gridSize = (size) => {
    switch(size) {
      case "1":
        this.cols = 30;
        this.rows = 20;
      break;
      case "2":
        this.cols = 50;
        this.rows = 30;
    }
    this.clear();
  }

  random = () => {
    //make a copy of the grid using the arrayClone function
    let gridCopy = arrayClone(this.state.gridFull);
    //loop over rows, then columns within each row
    for (let i = 0; i<this.rows; i++){
      for (let j=0; j<this.cols; j++){
        /* Math.random generates a random number between 0 and 1, 
        when multiplied by 4 we get a random number between 0 and 4,
        we round down to the nearest integer. This method will generate
        a 1 25% of the time.  
        */
        if (Math.floor(Math.random()*4) === 1){
          //if the random number is a 1, we fill the grid
          gridCopy[i][j] = true; //25% chance of filling in the square
        }
      }
    }
    //set the state with the copied grid containing about 25% "live cells"
    this.setState({
      gridFull: gridCopy
    });
  }

  //play button function to start game 
  playButton = () => {
    //this line is to start the game over once someone clicks the playButton
    clearInterval(this.intervalId);
    //this will run the play function at the specified rate
    this.intervalId = setInterval(this.play, this.speed);
  }

  pauseButton = () => {
    clearInterval(this.intervalId);
  }

  clear = () => {
    let grid = Array(this.rows).fill().map(() => Array(this.cols).fill(false));
    this.setState({
      gridFull: grid,
      generation: 0
    });
  }
 
  //main function for making the game work
  /*
  1. Any live cell with fewer than two live neighbors dies
  2. Any live cell with two or three live neighbors lives on to the next generation
  3. Any live cell with more than three live neighbors dies
  4. Any dead cell with exactly three live neighbors becomes a live cell
  */

play = () => {
  let g = this.state.gridFull;
  let g2 = arrayClone(this.state.gridFull);

  // loop over each row and then each column within the row
  for (let i = 0; i < this.rows; i++) {
    for (let j = 0; j < this.cols; j++){
      let count = 0; // the count keeps track of the number of adjacent live cells
      /* 
        i is the row
        i-1 is the row above i
        i+1 is the row below i
        j is the column
        j-1 is the column to the left
        j+1 is the column to the right
        we can access a cell with i,j and there are 8 cells around cell i,j
        top [i-1][j]
        top-right-corner [i-1][j+1]
        right-side [i][j+1]
        bottom-right-corner [i+1][j+1]
        bottom [i+1][j]
        bottom-left-corner [i+1][j-1]
        left-side [i][j-1]
        top-left-corner [i-1][j-1]

        We are have to apply thr rules carefully to cells that are not in the top(i=0)/bottom(i = this.rows-1) rows
        and not in the left(j=0)/right(j=this.cols-1) columns
        */
      //if we are not at the top row, add to count if cell at top is full
      if (i > 0) if (g[i-1][j]) count++; 
      //if we are not at the top-left-corner, add to count if cell at top-left-corner is full 
      if (i > 0 && j > 0) if (g[i-1][j-1]) count++; 
      //if we are not at the top-right-corner, add to count if cell at top-right-corner is full
      if (i > 0 && j < this.cols - 1) if (g[i-1][j+1]) count++;
      //if we are not at the far right column, add to the count if the cell to the right is full
      if (j < this.cols-1) if (g[i][j+1]) count++;
      //if we are not at the far left column, add to the count if the cell to the left is full
      if (j > 0) if (g[i][j-1]) count++;
      //if we are not in the bottom row, add to the count if the cell below is full
      if (i < this.rows - 1) if (g[i+1][j]) count++;
      //if we are not in the bottom left corner, add to the count if the cell in bottom left corner is full
      if (i < this.rows - 1 && j > 0) if (g[i+1][j-1]) count++;
      //if we are not in the bottom right corner, add to the count if cell in bottom right corner is full
      if (i < this.rows - 1 && j < this.cols - 1) if (g[i+1][j+1]) count++;
      //apply the rules of the game based on the count of filled adjacent cells
      if (g[i][j] && (count < 2 || count > 3)) g2[i][j] = false;
      if (!g[i][j] && count === 3) g2[i][j] = true;
    } 
  }
  this.setState({
    gridFull: g2,
    generation: this.state.generation + 1
  });
}

slow = () => {
  this.speed = 1000;
  this.playButton();
}

fast = () => {
  this.speed = 100;
  this.playButton();
}

  render(){

    return (
      //always wrap everything in a div
      <div className="App">

      <div className = "container">

      <div className= "main">
        <h2>
          Conway's Game Of Life
        </h2>
        <Grid
          /* pass in these variables in the parent component so as to reference them
          from within the Grid component */ 
          gridFull = {this.state.gridFull}
          rows = {this.rows}
          cols = {this.cols}
          selectBox = {this.selectBox}
        
        />
        <h4>
          Generations: {this.state.generation}
        </h4>
        {/* <Info />
        <Route path='/about' component={About}/>
        <Route path='/rules' component={Rules}/> */}
        <Rules />
        <About />
        </div>

        <div className = "side-panel">
        <Controls 
          playButton = {this.playButton}
          pauseButton = {this.pauseButton}
          clearButton = {this.clear}
          slow = {this.slow}
          fast = {this.fast}
          random = {this.random}
          gridSize = {this.gridSize}
        />
        </div> 

        </div>

      </div>
    );
  }
}

/*create this helper function to take in an array and then stringify then copy it (deep clone)
 can't use slice because this is a nested array
*/
function arrayClone(arr){
  return JSON.parse(JSON.stringify(arr));
}

export default App;
