import React from 'react';
import './Game.css';
import styled from 'styled-components';
import img2 from '../Images/newpause.png';
import img1 from '../Images/newestart.png';

import '../Hover/hover-min.css';

import gear from '../Images/newsettings.png';

const Play = styled.button`

cursor: pointer;
border: none;
text-decoration: none;
background-color: none;
margin-left: 40px;
margin-top: 10px;
margin-right: 20px;
height: 60px;
width: 200px;
background-image:url(${img1})
`
const Pause = styled.button`
cursor: pointer;
text-decoration: none;
background-color: none;
border: none;
margin-left: 40px;
margin-top: 10px;
margin-right: 20px;
width: 200px;
height: 60px;
background-image:url(${img2})
`
const Msecer = styled.input`
width: 75px;
background-color: none;
background: none;
color: #ffc107;
border: 2px solid #ffc107;
height: 30px;
font-family: 'Chakra Petch', sans-serif;
font-size: 28px;
`
const Update = styled.h1`
margin-top: 15px;
color:#ffc107`

const Clear = styled.button`
cursor: pointer;
text-decoration: none;
background-color: #B416AE;
border: 1px solid #340069;
width: 200px;
height: 70px;
font-family: 'Chakra Petch', sans-serif;
color: #FBC36A;
margin-left: 815px;
font-size: 26px;
font-style: italic;
position: absolute;
margin-top: 200px;
border-radius: 5px;
`
const Counterino =styled.h1`
position: absolute;
margin-top: 70px;
margin-left: 20px;
font-size: 24px;`

const Setting = styled.button`
cursor: pointer;
border: none;
text-decoration: none;
background-image:url(${gear});
width: 190px;
height: 42px;
background-color: none;
position: absolute;
margin-left: 820px;
margin-top: 300px;
`
const Optionsbox = styled.div`
width: 200px;
height: 350px;
background-color: #FFD870;
border: 3px solid #340069;
font-family: 'Chakra Petch', sans-serif;
color: #340069;
position: absolute;
margin-left: 813px;
margin-top: 355px;
text-align: center;
`
const Onedim = styled.button`
width: 80px;
height: 50px;
font-family: 'Chakra Petch', sans-serif;
color: #FBC36A;
border-radius: 5px;
background-color: #E23D6C;
border: none;
cursor: pointer;
margin-left: 7px;
margin-right: 7px;
margin-top: 4px;
`
const More = styled.div`
width: 130px;
height: 30px;
background-color: #340069;
color: #FBC36A;
position: absolute;
margin-left: 850px;
margin-top: 330px;
font-family: 'Chakra Petch', sans-serif;
text-align: center;
border-radius: 4px;

 `
 const Lil = styled.button`
 text-decoration: none;
 background-color: none;
 background: none;
 cursor: pointer;
 color: #FBC36A;
 font-family: 'Chakra Petch', sans-serif;
 border: none;
 font-size: 18px;
 `

 const Sizeoptions = styled.div`
width: 200px;
height: 350px;
background-color: #FFD870;
border: 3px solid #340069;
font-family: 'Chakra Petch', sans-serif;
color: #340069;
position: absolute;
margin-left: 813px;
margin-top: 355px;
text-align: center;
`
const Oneyellow = styled.button`
width: 80px;
height: 50px;
font-family: 'Chakra Petch', sans-serif;
color: black;
border-radius: 5px;
background-color: #FBC36A;
border: none;
cursor: pointer;
margin-left: 7px;
margin-right: 7px;
margin-top: 4px;
border: 4px solid black;
`
const Twoyellow = styled.button`
width: 80px;
height: 50px;
font-family: 'Chakra Petch', sans-serif;
color: black;
border-radius: 5px;
background-color: #FFD870;
border: none;
cursor: pointer;
margin-left: 7px;
margin-right: 7px;
margin-top: 4px;
border: 4px solid black;
`

const Threeyellow = styled.button`
width: 80px;
height: 50px;
font-family: 'Chakra Petch', sans-serif;
color: black;
border-radius: 5px;
background-color: #F6A462;
border: none;
cursor: pointer;
margin-left: 7px;
margin-right: 7px;
margin-top: 4px;
border: 4px solid black;
`

const Oranger = styled.button`
width: 80px;
height: 50px;
font-family: 'Chakra Petch', sans-serif;
color: black;
border-radius: 5px;
background-color: #EF5656;
border: none;
cursor: pointer;
margin-left: 7px;
margin-right: 7px;
margin-top: 4px;
border: 4px solid black;
`
const Slimypink = styled.button`
width: 80px;
height: 50px;
font-family: 'Chakra Petch', sans-serif;
color: black;
border-radius: 5px;
background-color: #E23D6C;
border: none;
cursor: pointer;
margin-left: 7px;
margin-right: 7px;
margin-top: 4px;
border: 4px solid black;
`
const Slimypurp = styled.button`
width: 80px;
height: 50px;
font-family: 'Chakra Petch', sans-serif;
color: black;
border-radius: 5px;
background-color: #B416AE;
border: none;
cursor: pointer;
margin-left: 7px;
margin-right: 7px;
margin-top: 4px;
border: 4px solid black;
`
const Medpurp = styled.button`
width: 80px;
height: 50px;
font-family: 'Chakra Petch', sans-serif;
color: white;
border-radius: 5px;
background-color: #690B95;
border: none;
cursor: pointer;
margin-left: 7px;
margin-right: 7px;
margin-top: 4px;
border: 4px solid black;
`

const Darkpurp = styled.button`
width: 80px;
height: 50px;
font-family: 'Chakra Petch', sans-serif;
color: white;
border-radius: 5px;
background-color: #340069;
border: none;
cursor: pointer;
margin-left: 7px;
margin-right: 7px;
margin-top: 4px;
border: 4px solid black;
`
let CELL_SIZE = 20;
let WIDTH = 800;
let HEIGHT = 500;


class Cell extends React.Component {

  state = {
    CELLCOLOR: {
      1: '#FBC36A',
      2: '#FFD870',
      3: '#F6A462',
      4: '#EF5656',
      5: '#E23D6C',
      6: '#B416AE',
      7: '#690B95',
      8: '#340069'
    },
    picker: 9
  }
  handleColor = () => {
    this.state.CELLCOLOR.splice(0,7)
    console.log('clicked')
  }
    render() {
      const { x, y } = this.props;
      const CELLCOLOR = {
        1: '#FBC36A',
        2: '#FFD870',
        3: '#F6A462',
        4: '#EF5656',
        5: '#E23D6C',
        6: '#B416AE',
        7: '#690B95',
        8: '#340069'
       
      }
     
      return (
        <div className="Cell" style={{
            background: `${this.state.CELLCOLOR[Math.floor(Math.random() *this.state.picker)]}`,
          left: `${CELL_SIZE * x + 1}px`,
          top: `${CELL_SIZE * y + 1}px`,
          width: `${CELL_SIZE - 1}px`,
          height: `${CELL_SIZE - 1}px`,
        }} />
      );
    }
  }

class Game extends React.Component {
    constructor() {
        super();
        this.rows = this.state.height / CELL_SIZE;
        this.cols = this.state.width / CELL_SIZE;
        this.board = this.makeEmptyBoard();
    }

    state = {
        cells: [],
        interval: 100,
        isRunning: false,
        counter: 0,
        height: 500,
        width: 800,
        
        
      }

      runGame = () => {
        this.setState({ isRunning: true });
        this.runIteration();
      }
      stopGame = () => {
        this.setState({ isRunning: false });
        if (this.timeoutHandler) {
            window.clearTimeout(this.timeoutHandler);
            this.timeoutHandler = null;
          }
      }

      runIteration() {
        let newBoard = this.makeEmptyBoard();
        
        
      
        for (let y = 0; y < this.rows; y++) {
            for (let x = 0; x < this.cols; x++) {
                let neighbors = this.calculateNeighbors(this.board, x, y);
                if (this.board[y][x]) {
                    if (neighbors === 2 || neighbors === 3) {
                        newBoard[y][x] = true;
                    } else {
                        newBoard[y][x] = false;
                    }
                } else {
                    if (!this.board[y][x] && neighbors === 3) {
                        newBoard[y][x] = true;
                    }
                }
            }
        }

        this.board = newBoard;
        this.setState({ cells: this.makeCells() });
        
        this.timeoutHandler = window.setTimeout(() => {
            this.runIteration();
            
        }, this.state.interval);
        
        this.state.counter++;
    }

      handleIntervalChange = (event) => {
        this.setState({ interval: event.target.value });
      }

     
      makeEmptyBoard() {
        let board = [];
        for (let y = 0; y < this.rows; y++) {
          board[y] = [];
          for (let x = 0; x < this.cols; x++) {
            board[y][x] = false;
          }
        }
        return board;
      }

      makeCells() {
        let cells = [];
        for (let y = 0; y < this.rows; y++) {
          for (let x = 0; x < this.cols; x++) {
            if (this.board[y][x]) {
              cells.push({ x, y });
            }
          }
        }
        return cells;
      }

      getElementOffset() {
        const rect = this.boardRef.getBoundingClientRect();
        const doc = document.documentElement;
        return {
          x: (rect.left + window.pageXOffset) - doc.clientLeft,
          y: (rect.top + window.pageYOffset) - doc.clientTop,
        };
      }
      handleClick = (event) => {
        const elemOffset = this.getElementOffset();
        const offsetX = event.clientX - elemOffset.x;
        const offsetY = event.clientY - elemOffset.y;
        
        const x = Math.floor(offsetX / CELL_SIZE);
        const y = Math.floor(offsetY / CELL_SIZE);

        
        if (x >= 0 && x <= this.cols && y >= 0 && y <= this.rows) {
          this.board[y][x] = !this.board[y][x];
        }
        this.setState({ cells: this.makeCells() });
      }

      calculateNeighbors(board, x, y) {
        let neighbors = 0;
        const dirs = [[-1, -1], [-1, 0], [-1, 1], [0, 1], [1, 1], [1, 0], [1, -1], [0, -1]];
        for (let i = 0; i < dirs.length; i++) {
            const dir = dirs[i];
            let y1 = y + dir[0];
            let x1 = x + dir[1];

            if (x1 >= 0 && x1 < this.cols && y1 >= 0 && y1 < this.rows && board[y1][x1]) {
                neighbors++;
            }
        }

        return neighbors;
    }

    handleClear = () => {
      this.board = this.makeEmptyBoard();
      this.setState({ cells: this.makeCells() });
  }
  handleRandom = () => {
    for (let y = 0; y < this.rows; y++) {
        for (let x = 0; x < this.cols; x++) {
            this.board[y][x] = (Math.random() >= 0.5);
        }
    }

    this.setState({ cells: this.makeCells()});
    
}


handleHundo = () => {
  this.setState({height: 100})
}
handleHundohundo = () => {
  this.setState({width: 100})
}
handleHundotwo = () => {
  this.setState({height: 200})
}
handleHundotwotwo = () => {
  this.setState({width: 200})
}
handleHundothree = () => {
  this.setState({height: 300})
}
handleHundothreethree = () => {
  this.setState({width: 300})
}
handleHundofour = () => {
  this.setState({height: 400})
}
handleHundofourfour = () => {
  this.setState({width: 400})
}
handleHundofive = () => {
  this.setState({height: 500})
}
handleHundofivefive = () => {
  this.setState({width: 500})
}
handleHundosix = () => {
  this.setState({height: 500})
}
handleHundosixsix = () => {
  
  this.setState({width: 500})
}
handleHundoreset = () => {
  this.setState({height: 500})
  this.setState({width: 800})
}

handleSettingstoggle = () => {
 let x = document.getElementById("special")
  if (x.style.display === "none") {
    x.style.display = "block"
  } else {
    x.style.display ="none"
  }

  let y = document.getElementById("More")
  if (y.style.display === "none") {
    y.style.display = "block"
  } else {
    y.style.display = "none"
  }
}

handleSizetoggle = () => {
let x = document.getElementById("special")
if (x.style.display === "none") {
  x.style.display = "block"
} 

let y = document.getElementById("Sizer") 
if (y.style.display === "block") {
  y.style.display = "none"
}
}
handleColortoggle = () => {
  let x = document.getElementById("Sizer")
  if (x.style.display ==="none") {
    x.style.display = "block"
  }
  let y = document.getElementById("special")
  if (y.style.display === "block") {
    y.style.display = "none"
  }
}


  render() {
    let CLASSVAR = 'useless'
    const { cells } = this.state;
    return (
      <div>
        
        <a  class="button hvr-wobble-skew">
<Clear onClick={() => this.handleRandom()}> Randomize Board</Clear>
</a>
<Setting onClick={this.handleSettingstoggle} ></Setting>

<More style={{display: 'none'}} id="More"> 
<Lil onClick={this.handleSizetoggle}>Size</Lil> | 
<Lil onClick={this.handleColortoggle}>Colors </Lil>
</More>

<Optionsbox id="special" style={{display: 'none'}}> GRID HEIGHT |  GRID WIDTH

<Onedim onClick={this.handleHundo}>100 </Onedim> |
<Onedim onClick={this.handleHundohundo} >100</Onedim> 
<Onedim onClick={this.handleHundotwo}>200</Onedim> |
<Onedim onClick={this.handleHundotwotwo}>200 </Onedim> 
<Onedim onClick={this.handleHundothree}>300</Onedim> |
<Onedim onClick={this.handleHundothreethree}>300</Onedim> 
<Onedim onClick={this.handleHundofour}>400</Onedim> |
<Onedim onClick={this.handleHundofourfour}>400</Onedim> 
<Onedim onClick={this.handleHundofive}>500</Onedim> |
<Onedim onClick={this.handleHundofivefive}>500</Onedim> 
<Onedim onClick={this.handleHundoreset} >Default</Onedim> 
 
</Optionsbox>

 <Sizeoptions id="Sizer" style={{display: 'none'}}> Toggle Colors on/off
<Oneyellow onClick={this.handleColor}> Amber</Oneyellow>
<Twoyellow> Yellow</Twoyellow>
<Threeyellow>Peach</Threeyellow>
<Oranger>Orange Red</Oranger>
<Slimypink>Pinkish</Slimypink>
<Slimypurp> Purple</Slimypurp>
<Medpurp>Medium Purple</Medpurp>
<Darkpurp>Dark Purple</Darkpurp>
 </Sizeoptions>
          
        <div className="Board"
          style={{ width: this.state.width, height: this.state.height, 
          backgroundSize: `${CELL_SIZE}px ${CELL_SIZE}px` }}

          onClick={this.handleClick}
          ref={ (n) => {this.boardRef = n; }}>

           {cells.map(cell => (
            <Cell x={cell.x} y={cell.y}
                key={`${cell.x},${cell.y}`}/>
          ))}
          
        </div>

        <div className="controls">

          <Update>Update every  <Msecer value={this.state.interval}
              onChange={this.handleIntervalChange} />  msec</Update>
          {this.state.isRunning ?
            <Pause onClick={this.stopGame}/> :
            <Play onClick={this.runGame}/>
          }
          <Counterino>
            Current Generation: {this.state.counter}
          </Counterino>
          
        </div>
        
      </div>
    );
  }
}
export default Game;
