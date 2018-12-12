import React, { Component } from 'react';
import styled from 'styled-components';
import './App.css';


const RangeSlider = styled.div`
  width: 100%;

  &,
  &:before,
  &:after {
    box-sizing: border-box;
  }

  .range-slider__range {
  -webkit-appearance: none;
  width: 50%;
  height: 10px;
  border-radius: 5px;
  background: #d7dcdf;
  outline: none;
  padding: 0;
  margin: 0;

  &::-webkit-slider-thumb {
    appearance: none;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: #2c3e50;
    cursor: pointer;
    transition: background .15s ease-in-out;

    &:hover {
      background: #1abc9c;
    }
  }

  &:active::-webkit-slider-thumb {
    background: #1abc9c;
  }

  &::-moz-range-thumb {
    width: 20px;
    height: 20px;
    border: 0;
    border-radius: 50%;
    background: #2c3e50;
    cursor: pointer;
    transition: background .15s ease-in-out;

    &:hover {
      background: #1abc9c;
    }
  }

  &:active::-moz-range-thumb {
    background: #1abc9c;
  }
  
  // Focus state
  &:focus {
    
    &::-webkit-slider-thumb {
      box-shadow: 0 0 0 3px #fff,
                  0 0 0 6px #1abc9c;
    }
  }
}

.range-slider__value {
  display: inline-block;
  position: relative;
  width: 60px;
  color: #fff;
  line-height: 20px;
  text-align: center;
  border-radius: 3px;
  background: #2c3e50;
  padding: 5px 10px;
  margin-left: 8px;

  &:after {
    position: absolute;
    top: 8px;
    left: -7px;
    width: 0;
    height: 0;
    border-top: 7px solid transparent;
    border-right: 7px solid #2c3e50;
    border-bottom: 7px solid transparent;
    content: '';
  }
}


/*modzilla overrides*/
::-moz-range-track {
    background: #d7dcdf;
    border: 0;
}

input::-moz-focus-inner,
input::-moz-focus-outer { 
  border: 0; 
}
`;


let interval;

class Grid extends Component {
  state = {
    currentNodeHolder: [],
    canClick: true,
    generation: 0,
    gridSizeValue: 16
  }

  componentDidMount() {
    this.init();
  }

  init = () => {
    let nextNodeHolder = [];

    class Node {
      constructor(id) {
        this.id = id;
        this.isAlive = false;
      }
      makeDead() {
        this.isAlive = false;
      }
      makeAlive() {
        this.isAlive = true;
      }
    }
    for (let i = 0; i < this.state.gridSizeValue; i++) {
      nextNodeHolder.push([]);
    }
    let id = 0;
    for (let i = 0; i < nextNodeHolder.length; i++) {
      for (let j = 0; j < nextNodeHolder.length; j++) {
        nextNodeHolder[i].push(new Node(id));
        id++
      }
    }
    
    this.setState({ currentNodeHolder: nextNodeHolder });
  }

  handleGridSizeChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
    setTimeout(() => {
      this.init();
    }, 0);
  }

  selectGridPreset = (e) => {
    let nextNodeHolder = this.state.currentNodeHolder.slice();

    switch(e.target.value) {
      case 'clearPresets':
        console.log('CLEAR');
      break;
      case 'gridPresetOne':
        console.log('ONE');
      break;
      case 'gridPresetTwo':
        console.log('TWO');
      break;
      case 'gridPresetThree':
        console.log('THREE');
      break;
      case 'gridPresetFour':
        console.log('FOUR');
      break;
      default:
      break;
    }
  }
  
  stepGeneration = () => {
    this.playGame();
  }

  startGame = () => {
    this.setState({canClick: false});
    interval = setInterval(() => {
      this.playGame();
    }, 500);
  }
  

  playGame = () => {
    let nextNodeHolder = this.state.currentNodeHolder.slice();
    let len = nextNodeHolder.length;
    let lenCheck = nextNodeHolder.length - 1;

    for (let i = 0; i < len; i++) {
      for (let j = 0; j < len; j++) {
        if (!nextNodeHolder[i][j].isAlive) {
          let checker = 0;
          
          if (j > 0 && nextNodeHolder[i][j-1]) {
            if (nextNodeHolder[i][j-1].isAlive) {
              checker++
            }
          }
          if (j < lenCheck && nextNodeHolder[i][j+1]) {
            if (nextNodeHolder[i][j+1].isAlive) {
              checker++
            }
          }
          if (i > 0 && j > 0 && nextNodeHolder[i-1][j-1]) {
            if (nextNodeHolder[i-1][j-1].isAlive) {
              checker++
            }
          }
          if (i > 0 && nextNodeHolder[i-1][j]) {
            if (nextNodeHolder[i-1][j].isAlive) {
              checker++
            }
          }
          if (i > 0 && j < lenCheck && nextNodeHolder[i-1][j+1]) {
            if (nextNodeHolder[i-1][j+1].isAlive) {
              checker++
            }
          }
          if (j > 0 && i < lenCheck && nextNodeHolder[i+1][j-1]) {
            if (nextNodeHolder[i+1][j-1].isAlive) {
              checker++
            }
          }
          if (i < lenCheck && nextNodeHolder[i+1][j]) {
            if (nextNodeHolder[i+1][j].isAlive) {
              checker++
            }
          }
          if (i < lenCheck && j < lenCheck && nextNodeHolder[i+1][j+1]) {
            if (nextNodeHolder[i+1][j+1].isAlive) {
              checker++
            }
          }
          if (checker === 3) {
            nextNodeHolder[i][j].makeAlive();
          }
        }

        if (nextNodeHolder[i][j].isAlive) {
          let checker = 0;
        
          if (j > 0 && nextNodeHolder[i][j-1]) {
            if (nextNodeHolder[i][j-1].isAlive) {
              checker++
            }
          }
          if (j < lenCheck && nextNodeHolder[i][j+1]) {
            if (nextNodeHolder[i][j+1].isAlive) {
              checker++
            }
          }
          if (i > 0 && j > 0 && nextNodeHolder[i-1][j-1]) {
            if (nextNodeHolder[i-1][j-1].isAlive) {
              checker++
            }
          }
          if (i > 0 && nextNodeHolder[i-1][j]) {
            if (nextNodeHolder[i-1][j].isAlive) {
              checker++
            }
          }
          if (i > 0 && j < lenCheck && nextNodeHolder[i-1][j+1]) {
            if (nextNodeHolder[i-1][j+1].isAlive) {
              checker++
            }
          }
          if (j > 0 && i < lenCheck && nextNodeHolder[i+1][j-1]) {
            if (nextNodeHolder[i+1][j-1].isAlive) {
              checker++
            }
          }
          if (i < lenCheck && nextNodeHolder[i+1][j]) {
            if (nextNodeHolder[i+1][j].isAlive) {
              checker++
            }
          }
          if (i < lenCheck && j < lenCheck && nextNodeHolder[i+1][j+1]) {
            if (nextNodeHolder[i+1][j+1].isAlive) {
              checker++
            }
          }
          if (checker === 2 || checker === 3) {
          } else {
            nextNodeHolder[i][j].makeDead();
          }
        }
      }
    }
    this.setState(prevState => {
      return { currentNodeHolder: nextNodeHolder, generation: prevState.generation + 1 };
    });
  }
  
  endGame = () => {
    clearInterval(interval);
    this.setState({ canClick: true });
  }
  
  toggleCell = (col) => {
    if (col.isAlive) {
      col.makeDead();
    } else {
      col.makeAlive();
    }
    this.forceUpdate()
  }
  
  clearCells = () => {
    let nextNodeHolder = this.state.currentNodeHolder.slice();

    for (let i = 0; i < nextNodeHolder.length; i++) {
      for (let j = 0; j < nextNodeHolder.length; j++) {
        if (nextNodeHolder[i][j].isAlive) {
          nextNodeHolder[i][j].makeDead();
        }
      }
    }
    
    this.setState({ currentNodeHolder: nextNodeHolder, generation: 0 });
  }
  
  render() {
    return (
      <main>
        {this.state.currentNodeHolder.map((row, index) => {
          return (
            <article>
              {this.state.currentNodeHolder[index].map(col => {
                return (
                  col.isAlive ? <span onClick={this.state.canClick? () => this.toggleCell(col) : null}> 1 </span> : <span onClick={this.state.canClick? () => this.toggleCell(col) : null}> 0 </span>
                  );
                })}
            </article>
          );
        })}
        <hr/>
        {/* section */}
        <button onClick={this.state.canClick? this.startGame: null}>Start</button>
        <button onClick={this.state.canClick? this.stepGeneration: null}>Step</button>
        <button onClick={this.endGame}>Stop</button>
        <button onClick={this.state.canClick? this.clearCells: null}>Clear Grid</button>
        <div>
          <label htmlFor="gridPresets">Choose a preset:</label>
          <select onChange={this.state.canClick? this.selectGridPreset: null} id="gridPresets">
            <option value="">-- Select --</option>
            <option value="clearPresets">Clear Grid</option>
            <option value="gridPresetOne">Preset 1</option>
            <option value="gridPresetTwo">Preset 2</option>
            <option value="gridPresetThree">Preset 3</option>
            <option value="gridPresetFour">Preset 4</option>
          </select>
        </div>

        <RangeSlider className="range-slider">
          <label htmlFor="gridSizeSlider">Choose a grid size:</label>
          <input 
            className="range-slider__range"
            id="gridSizeSlider"
            name="gridSizeValue"
            type="range"
            value={this.state.gridSizeValue}
            onChange={this.state.canClick? this.handleGridSizeChange : null}
            min="16"
            max="100"
          />
          <span className="range-slider__value">{this.state.gridSizeValue}</span>
        </RangeSlider>

        <p><strong>Generation: {this.state.generation}</strong></p>
      </main>
    );
  }
}

export default Grid;
