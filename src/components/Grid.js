import React from 'react';
import Inputs from './Inputs';

class Grid extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isPlaying: false,
      grid: [],
      width: 0,
      height: 0,
      gen: 0
    }
    this.prevTimestamp = null;
    this.startHandler = this.startHandler.bind(this);
    this.stepHandler = this.stepHandler.bind(this);
    this.clearHandler = this.clearHandler.bind(this);
    this.clickHandler = this.clickHandler.bind(this);
    this.onAnimFrame = this.onAnimFrame.bind(this);
    this.getNeighbors = this.getNeighbors.bind(this);
    this.updateCanvas = this.updateCanvas.bind(this);
    this.drawIt = this.drawIt.bind(this);
    this.populate = this.populate.bind(this);
  }

  componentDidMount() {
    let boxes = new Array(255).fill(0);

    let canvas = this.refs.canvas;
    let ctx = canvas.getContext('2d');
    let w = ctx.canvas.width;
    let h = ctx.canvas.height;
    let boxw = w/15;
    let boxh = h/15;

    console.log(`canvas width: ${w}`);

    for (let x=0;x<=w;x+=boxw) {
        for (let y=0;y<=h;y+=boxh) {
            ctx.moveTo(x, 0);
            ctx.lineTo(x, h);
            ctx.stroke();
            ctx.moveTo(0, y);
            ctx.lineTo(w, y);
            ctx.stroke();
        }
    }

    this.setState({
      grid: boxes,
      width: boxw,
      height: boxh
    }, this.updateCanvas(boxes));
  }

  startHandler() {
    this.setState((prevState) => ({ isPlaying: !prevState.isPlaying }), () => {
      if(this.state.isPlaying) requestAnimationFrame(this.onAnimFrame);
    }
    )
  }

  stepHandler() {
    if(this.state.isPlaying === false) requestAnimationFrame(this.onAnimFrame);
  }

  clearHandler() {
    if (this.state.isPlaying === false) {
      let newGrid = new Array(255).fill(0);
      let kills = [];

      for (let i = 0; i < this.state.grid.length; i++) {
        if (this.state.grid[i] === 1) {
          kills.push(i);
        }
      }

      this.setState({ grid: newGrid, gen: 0 }, this.updateCanvas([], kills));
    }
  }

  clickHandler(e) {
    if (this.state.isPlaying === false) {
      let rect = this.refs.canvas.getBoundingClientRect();
      let x = e.clientX - rect.left;
      let y = e.clientY - rect.top;
      let grid = this.state.grid.slice(0);
      console.log(`this.state.width: ${this.state.width}`);
      console.log(`rect.left:${rect.left}`);
      console.log(`rect.right:${rect.right}`);
      x = Math.floor(x/this.state.width);
      y = Math.floor(y/this.state.height);
      console.log(`clientX:${e.clientX}`);
      console.log(`x:${x} y:${y}`);
      let index = (y*15)+x;
      if (grid[index] === 1) {
        grid[index] = 0;
        this.setState({ grid: grid }, this.updateCanvas([], [index]));
      } else {
        grid[index] = 1;
        this.setState({ grid: grid }, this.updateCanvas([index], []));
      }
    }
  }

  onAnimFrame(timestamp) {
      // If we haven't yet stored the previous time, fake it
      if (this.prevTimestamp === null) {
          this.prevTimestamp = timestamp - 30; // milliseconds
      }

      // Compute how long it took between frames
      const elapsed = timestamp - this.prevTimestamp

      // Remember this for next frame
      this.prevTimestamp = timestamp;

      console.log(`Current time: ${timestamp} ms, frame time: ${elapsed} ms`);

      // Calculate the fate of each cell based on getNeighbors
      let newGen = [];
      let births = [];
      let deaths = [];

      for (let i = 0;i < this.state.grid.length;i++) {
        let currCell = this.state.grid[i];
        let neighbors = this.getNeighbors(i);
        // if a living cell has less than 2 or more than 3 neighbors it dies
        if(currCell === 1 && (neighbors < 2 || neighbors > 3)) {
          newGen[i] = 0;
          deaths.push(i);
        }
        // if a dead cell has exactly 3 neighbors it gains life
        else if(currCell === 0 && neighbors === 3) {
          newGen[i] = 1;
          births.push(i);
        }
        // otherwise the cell persists
        else newGen[i] = currCell;
      }

      this.updateCanvas(births, deaths);
      this.setState((prevState) => ({
        grid: newGen,
        gen: prevState.gen + 1
      }));

      if(this.state.isPlaying) {
        setTimeout(() => {
          requestAnimationFrame(this.onAnimFrame);
        }, 1000);
      }
  }

  getNeighbors(index) {
    let numNeighbors = 0;
    let neighbors = [-16, -15, -14, -1, 1, 14, 15, 16];
    for(let i = 0; i < neighbors.length;i++){
      let neighborCell = index+neighbors[i];
      if(neighborCell >= 0 && neighborCell < this.state.grid.length){ //if inside the array
        if(index%15 === 0 && (neighbors[i] === -16 ||
          neighbors[i] === 14 ||
          neighbors[i] === -1)) continue; //exclude left overflow
        if(index%15 === 14 && (neighbors[i] === -14 ||
          neighbors[i] === 1 ||
          neighbors[i] === 16)) continue; //exclude right overflow
        if(this.state.grid[index+neighbors[i]] === 1) numNeighbors++;
      }
    }

    return numNeighbors;
  }

  drawIt(ctx, x, y, w, h, type) {
      if(type === 'birth') {
        ctx.fillRect(x,y,w,h);
      } else if(type === 'death') {
        ctx.clearRect(x+1,y+1,w-2,h-2);
      }
  }

  updateCanvas(births, deaths=null) {
    let canvas = this.refs.canvas;
    let ctx = canvas.getContext('2d');

    if(deaths != null) {
      for (let i = 0; i < births.length; i++) {
        //get the row and column of the cell
        let x = births[i] % 15;
        let y = Math.floor(births[i]/15);
        //convert row and column into coordinate values
        x *= this.state.width;
        y *= this.state.height;
        //fillRect!
        this.drawIt(ctx, x, y, this.state.width, this.state.height, 'birth');
      }
      for (let j = 0; j < deaths.length; j++) {
        //get the row and column of the cell
        let x = deaths[j] % 15;
        let y = Math.floor(deaths[j]/15);
        //convert row and column into coordinate values
        x *= this.state.width;
        y *= this.state.height;
        //fillRect!
        this.drawIt(ctx, x, y, this.state.width, this.state.height, 'death');
      }
    } else {
      for (let k = 0; k < births.length; k++) {
        if(births[k] === 1) {
          let x = k % 15;
          let y = Math.floor(k/15);
          //convert row and column into coordinate values
          x *= this.state.width;
          y *= this.state.height;
          //fillRect!
          this.drawIt(ctx, x, y, this.state.width, this.state.height, 'birth');
        }
      }
    }
  }

  populate(e) {
    if(this.state.isPlaying === false){
      this.clearHandler();
      let newGrid = new Array(255).fill(0);
      let arr = [];
      switch(e.target.name) {
        case 'random':
          for (let i = 0; i < newGrid.length; i++) {
            newGrid[i] = Math.floor(Math.random() * Math.floor(2));
          }
          this.setState({ grid: newGrid }, this.updateCanvas(newGrid));
          break;
        case 'glider':
          arr = [53,66,67,68,37];
          break;
        case 'pulsar':
          arr = [18,19,20,24,25,26,58,73,88,101,100,99,83,68,53,51,66,81,95,94,93,76,61,46,136,151,166,198,199,200,171,156,141,125,124,123,143,158,173,204,205,206,178,163,148,131,130,129];
          break;
        case 'blinker':
          arr = [67,82,97];
          break;
        default:
          break;
      }
      if(e.target.name !== 'random'){
        for (let i = 0; i < arr.length; i++) {
          newGrid[arr[i]] = 1;
        }
        this.setState({ grid: newGrid }, this.updateCanvas(arr,[]));
      }
    }
  }

  render() {
    return (
      <div className='grid'>
        <canvas id="canvas" ref="canvas" width="725" height="550" onClick={this.clickHandler}></canvas>
        <Inputs startHandler={this.startHandler} isPlaying={this.state.isPlaying} gen={this.state.gen} stepHandler={this.stepHandler} clearHandler={this.clearHandler} populate={this.populate}/>
      </div>
  )}
}

export default Grid;
