import React, { Component } from 'react';
import CCA from './cca';
import './App.css';
const canvasWidth =400;
const canvasHeight=300;
const COLORS = [
  [0, 0, 0],
  [0x8f, 0, 0x5f],
  [0x5f, 0, 0x8f],
  [0, 0, 0xff],
  [0, 0x5f, 0x7f],
  [0x5f, 0x8f, 0x7f],
  [0x8f, 0xff, 0x7f],
  [0xff, 0x5f, 0x7f],
]

/**
 * CCA canvas
 */
class CCACanvas extends Component {

  /**
   * Constructor
   */
  constructor(props) {
    super(props);
  }

  /**
   * Component did mount
   */
  componentDidMount() {
    this.animFrame();
  }

  /**
   * Handle an animation frame
   */
  animFrame() {
    let canvas = this.refs.canvas;
let ctx = canvas.getContext('2d');

let imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

// Here is the screen buffer array we can manipulate:

let screenBuffer = imageData.data;
for( let i = 0; i < 1000; i+=4){


screenBuffer[i + 0] = 0;//r
screenBuffer[i + 1] =0;//g
screenBuffer[i + 2] =0;//b
screenBuffer[i + 3] =255;//a
}
console.log('screenBuffer in aniFrame: ', screenBuffer);
ctx.putImageData(imageData, 0, 0);
  }


  /**
   * Render
   */
  render() {
    return <canvas ref="canvas" width={canvasWidth} height={canvasHeight}></canvas>
  }
}

/**
 * CCA holder component
 */
class CCAApp extends Component {

  /**
   * Render
   */
  render() {
    return (
      <div>
        <CCACanvas width={canvasWidth} height={canvasHeight} />
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
        <CCAApp />
      </div>
    );
  }
}

export default App;