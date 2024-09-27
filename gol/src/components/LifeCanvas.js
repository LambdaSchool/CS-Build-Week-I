import React, { Component } from 'react';
import gameOfLife from '../util/algo';
import { Control, ControlButton } from './styles/Control';
import { glider, blinker, randomBoard } from '../util/patterns';

class LifeCanvas extends Component {
  state = {
    height: 500,
    width: 500,
    square: 15,
    matrix: [],
    start: false,
    iter: 0,
    intervalId: null
  };

  componentDidMount() {
    this.initializeCanvas();
  }

  initializeCanvas = () => {
    let canvas = this.refs.canvas.getContext('2d');
    canvas.beginPath();
    canvas.clearRect(0, 0, canvas.canvas.width, canvas.canvas.height);
    canvas.fillStyle = 'white';

    const iter = this.state.height / this.state.square;

    canvas.fillRect(0, 0, this.state.height, this.state.width);

    for (let i = 0; i <= this.state.width; i += iter) {
      canvas.moveTo(i, 0);
      canvas.lineTo(i, this.state.height);
      for (let j = 0; j <= this.state.height; j += iter) {
        canvas.moveTo(0, j);
        canvas.lineTo(this.state.width, j);
      }
    }
    canvas.stroke();
    const matrix = new Array(this.state.square)
      .fill(0)
      .map(() => new Array(this.state.square).fill(0));
    this.setState({ matrix });
  };

  getCursorPosition = e => {
    if (this.state.start) {
      return;
    }
    let canvas = this.refs.canvas;
    let rect = canvas.getBoundingClientRect();
    let x = e.clientX - rect.left;
    let y = e.clientY - rect.top;
    // console.log(`X: ${x}, Y: ${y}`);
    let squareSize = this.state.height / this.state.square;
    let currentSquareX = Math.floor(x / squareSize);
    let currentSquareY = Math.floor(y / squareSize);
    // console.log(`X: ${currentSquareX}, Y: ${currentSquareY}`);
    let matrix = this.state.matrix.slice(0);
    matrix[currentSquareY][currentSquareX] ^= 1;
    this.setState({ matrix }, () =>
      this.updateSingleCanvas(currentSquareY, currentSquareX, squareSize)
    );
  };

  updateSingleCanvas = (currentSquareY, currentSquareX, squareSize) => {
    let canvas = this.refs.canvas.getContext('2d');
    if (this.state.matrix[currentSquareY][currentSquareX] === 1) {
      canvas.fillStyle = 'black';
      canvas.fillRect(
        currentSquareX * squareSize + 1,
        currentSquareY * squareSize + 1,
        squareSize - 2,
        squareSize - 2
      );
    } else {
      canvas.fillStyle = 'white';
      canvas.fillRect(
        currentSquareX * squareSize + 1,
        currentSquareY * squareSize + 1,
        squareSize - 2,
        squareSize - 2
      );
    }
  };

  clearCanvas = () => {
    const matrix = new Array(this.state.square)
      .fill(0)
      .map(() => new Array(this.state.square).fill(0));
    if (this.state.intervalId) {
      clearInterval(this.state.intervalId);
    }
    this.setState({ matrix, intervalId: null, iter: 0, start: false }, () =>
      this.updateFullCanvas()
    );
  };

  computeNext = () => {
    const matrix = gameOfLife(this.state.matrix);
    this.setState(
      prevState => ({ matrix, iter: prevState.iter + 1 }),
      () => this.updateFullCanvas()
    );
  };

  updateFullCanvas = () => {
    let canvas = this.refs.canvas.getContext('2d');
    let squareSize = this.state.height / this.state.square;
    for (let i = 0; i < this.state.matrix.length; i++) {
      for (let j = 0; j < this.state.matrix[0].length; j++) {
        if (this.state.matrix[j][i] === 1) {
          canvas.fillStyle = 'black';
          canvas.fillRect(
            i * squareSize + 1,
            j * squareSize + 1,
            squareSize - 2,
            squareSize - 2
          );
        } else {
          canvas.fillStyle = 'white';
          canvas.fillRect(
            i * squareSize + 1,
            j * squareSize + 1,
            squareSize - 2,
            squareSize - 2
          );
        }
      }
    }
  };

  startCanvas = () => {
    let intervalId = setInterval(this.computeNext, 500);
    this.setState({ start: true, intervalId });
  };

  presetHandler = e => {
    let matrix;
    switch (e.target.value) {
      case 'glider':
        matrix = glider(this.state.square);
        this.setState({ matrix }, () => this.updateFullCanvas());
        break;
      case 'blinker':
        matrix = blinker(this.state.square);
        this.setState({ matrix }, () => this.updateFullCanvas());
        break;
      case 'random':
        matrix = randomBoard(this.state.square);
        this.setState({ matrix }, () => this.updateFullCanvas());
        break;
      default:
        break;
    }
  };

  handleChange = e => {
    this.setState({ [e.target.name]: Number(e.target.value) }, () =>
      this.initializeCanvas()
    );
  };

  render() {
    return (
      <>
        <canvas
          ref="canvas"
          height={this.state.height}
          width={this.state.width}
          onClick={this.getCursorPosition}
        />
        <Control>
          <ControlButton onClick={this.computeNext}>Next</ControlButton>
          <ControlButton onClick={this.startCanvas}>Play</ControlButton>
          <ControlButton onClick={this.clearCanvas} last>
            Clear
          </ControlButton>
          <p>Generation #{this.state.iter}</p>
          <select onChange={this.presetHandler}>
            <option value="none">None</option>
            <option value="glider">Glider</option>
            <option value="blinker">Blinker</option>
            <option value="random">Random</option>
          </select>
          <input
            type="range"
            id="size"
            name="square"
            min="15"
            max="40"
            onChange={this.handleChange}
            value={this.state.square}
          />
          <label htmlFor="size">Square Count</label>
        </Control>
      </>
    );
  }
}

export default LifeCanvas;
