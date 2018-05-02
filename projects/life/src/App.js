import React, { Component } from 'react';
import Life from './life';
import './App.css';

const color = [[255, 40, 100], [150, 255, 60]];
/**
 * Life canvas
 */
class LifeCanvas extends Component {

  /**
   * Constructor
   */
  constructor(props) {
    super(props);

    this.life = new Life(props.width, props.height);
    this.life.randomize();
  }

  /**
   * Component did mount
   */
  componentDidMount() {
    requestAnimationFrame(() => {this.animFrame()});
  }

  /**
   * Handle an animation frame
   */
  animFrame() {
    //
    // !!!! IMPLEMENT ME !!!!
    let width = this.props.width;
    let height = this.props.height;
    //

    // Request another animation frame
    // Update life and get cells
    let cells = this.life.getCells();
    // Get canvas framebuffer, a packed RGBA array
    let canvas = this.refs.canvas;
    let ctx = canvas.getContext('2d');
    let imageData = ctx.getImageData(0, 0, width, height);
    // Convert the cell colors
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        let index = (y * width + x) * 4;
        let lifeStatus = cells[y][x];

        imageData.data[index + 0] = color[lifeStatus][0];
        imageData.data[index + 1] = color[lifeStatus][1];
        imageData.data[index + 2] = color[lifeStatus][2];
        imageData.data[index + 3] = 0xff;
      }
    }
    // Put the new image data back on the canvas
    ctx.putImageData(imageData, 0, 0);
    // Next generation of life
    this.life.step();

    requestAnimationFrame(() => {this.animFrame()});
  }

  /**
   * Render
   */
  render() {
    return <canvas ref="canvas" width={this.props.width} height={this.props.height} />
  }
}

/**
 * Life holder component
 */
class LifeApp extends Component {

  /**
   * Render
   */
  render() {
    return (
      <div>
        <LifeCanvas width={400} height={300} />
      </div>
    )
  }
}

/**
 * Outer App component
 */
class App extends Component {

  /**
   * Render
   */
  render() {
    return (
      <div className="App">
        <LifeApp />
      </div>
    );
  }
}

export default App;
