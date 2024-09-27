import React, { Component } from 'react';

export default class Game extends Component {
  constructor(props) {
    super(props);

    this.state = {
      buttonCommand: null
    };
  }

  drawCanvas = () => {
    const canvas = this.refs.game;
    const ctx = this.refs.game.getContext('2d');
    const grid = this.props.grid.slice();
    const lineOffset = 0.5;
    const fillOffset = 1;

    canvas.width = canvas.height = this.props.canvasSize;
    ctx.strokeStyle = ctx.fillStyle = this.props.gridColor;
    
    for (let x = lineOffset; x < this.props.numCells * this.props.cellSize; x += this.props.cellSize) {
      ctx.moveTo(x, 0);
      ctx.lineTo(x, this.props.numCells * this.props.cellSize);
    }

    for (let y = lineOffset; y < this.props.numCells * this.props.cellSize; y += this.props.cellSize) {
      ctx.moveTo(0, y);
      ctx.lineTo(this.props.numCells * this.props.cellSize, y);
    }
    ctx.stroke();
    
    for (let x = 0; x < grid.length; x++) {
      for (let y = 0; y < grid[x].length; y++) {
        const cell = grid[x][y];
        if (cell.isAlive) {
          ctx.fillStyle = cell.color;
          ctx.fillRect(x * this.props.cellSize + fillOffset, 
            y * this.props.cellSize + fillOffset,
            this.props.cellSize - fillOffset,
            this.props.cellSize - fillOffset);
        }
      }
    }

  }

  onGameClick = e => {
    e.preventDefault();
    this.props.onGameClick(e, this.refs.game);
    console.log('game click');
  };

  componentDidUpdate = prevProps => {
    this.drawCanvas();
  }

  componentDidMount = () => {
    this.drawCanvas();
    this.props.randomize();
  }

  render() {
    return (
      <canvas ref="game" className="game" onClick={e => this.onGameClick(e)}></canvas>
    );
  }
}
