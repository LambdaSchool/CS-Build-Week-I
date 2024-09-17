import React, { Component } from "react";
import styled from "styled-components";
import { colors } from "../../utils/variables";
import Cell from "./Cell";
class Canvas extends Component {
  /**
   * Constructor
   */
  constructor(props) {
    super(props);

    this.state = {
      cells: [],
      animPlay: false
    }
  }

  /**
   * After the component has mounted
   */
  componentDidMount() {
    this.gridSize = 15;
    // Request initial animation frame
    this.onAnimFrame();
    this.setState({
      cells: [],
      animPlay: this.props.playActive
    }, () => {
      this.canvas = this.refs.canvas;
      this.squareLen = this.canvas.width / this.gridSize;
      this.ctx = this.canvas.getContext("2d");
      this.setState({
        cells: Array.apply(null, Array(this.gridSize*this.gridSize)).map(() => new Cell(this.ctx, this.squareLen)),
      }, () => {
        this.initialDrawing();
      })
    })
  }
  shouldComponentUpdate(nextProps, nextState) {
    if(nextProps.playActive !== this.props.playActive) {
      this.setState({
        animPlay: this.props.playActive
      }, this.onAnimFrame);
      return true
    }
    else {
      return false;
    }
  }

  initialDrawing() {
    const { cells } = this.state;
    this.ctx.beginPath();
    let sqIndex = 0;
    for (let row = 0; row < Math.sqrt(cells.length); row++) {
      for (let column = 0; column < Math.sqrt(cells.length); column++) {
        cells[sqIndex].setCoords(
          column * this.squareLen,
          row * this.squareLen
          );
        cells[sqIndex].draw();
        sqIndex++;
      }
    }
  }
  /**
   * When the component is about to unmount
   */

  componentWillUnmount() {
    // Stop animating
    this.setState({
      animPlay: false,
      cells: []
    });
  }

  fillSquare(e) {
    console.log("fillSquare");
    // Start counting from 0
    const clickedSqX = Math.ceil(e.clientX / this.squareLen) - 1;
    const clickedSqY = Math.ceil(e.clientY / this.squareLen) - 1;
    const cellIndex = clickedSqX + (15 * clickedSqY);
    this.toggleCell(cellIndex);
    const imageData = this.ctx.getImageData(0,0, this.canvas.width, this.canvas.height);
    this.ctx.putImageData(imageData, 0, 0);
  }
  toggleCell(cellIndex) {
    this.state.cells[cellIndex].switchColors();
    this.state.cells[cellIndex].draw();
  }
  getPixelIndex(x, y, width) {
    return (y * width + x) * 4;
  }
  onAnimFrame(timestamp) {
    // If desired, request another anim frame for later
    if (this.props.playActive) {
      console.log("onAnimFrame");
      requestAnimationFrame(() => {
        this.onAnimFrame();
      });
    }
    // TODO animate stuff
  }
  getPixel(imageData, x, y) {
    const w = imageData.width; // Conveniently the width is here
    const h = imageData.height;

    if (x < 0 || x >= w || y < 0 || y >= h) {
        // Out of bounds
        return null;
    }

    // Compute index within the array
    const index = (w * y + x) * 4;

    // Return a copy of the R, G, B, and A elements
    return imageData.data.slice(index, index + 4);
}

  /**
   * Render the canvas
   */
  render() {
    return (
        <canvas width="500" height="500" ref="canvas" onClick = {(e) => {
          this.fillSquare(e);
          }} />
    );
  }
}

export default Canvas;
