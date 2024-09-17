import React, { Component } from 'react';
import axios from 'axios';
import Board from './components/board/board.js';
import Form from './components/controls/form.js';

class App extends Component {
  constructor(){
    super();
    this.state = {
      strippedData: [],
      generation: 0,
      rows: 20,
      cols: 20
    }
  }
  componentDidMount(){
    this.makeGridDataStruct()
  }

  parseData = () => {
    let strippedData = []
    this.state.game.forEach((instance, index) => {
      strippedData[index] = instance.join('');
    })
    this.setState({strippedData: strippedData})
  }

  revertCells = () => {
    let redcells = document.getElementsByClassName('redcell');
    while(redcells.length){
      redcells[0].classList.remove('redcell')
    }
  }

  colorCells = () => {
    this.gridToText()
    axios.get('http://www.raymondgrc.com/cgi-bin/helloworld.pl', {
      params: {
        iterations: 100,
        rows: this.state.rows,
        cols: this.state.cols,
        startpos: this.state.startpos
      }
    })
    .then(response =>{
      this.setState({game: response.data})
      this.parseData()
      let cells = document.getElementsByClassName('cell');
      if(this.state.generation < this.state.strippedData.length){
        this.state.strippedData[this.state.generation].split('').forEach((instance,index) => {
          if(instance === 'X'){
            cells[index].classList.add('redcell')
          }
        })
        setTimeout(() => this.revertCells(), 300)
        this.setState({generation: this.state.generation + 1})
      }
      if(this.state.generation === this.state.strippedData.length){
        clearInterval(this.intervalID);
        this.setState({generation: 0});
      }
    })
    .catch(err => console.log(err))

  }
  makeGridDataStruct = () => {
    let gridStruct = [];
    for(let i = 0; i < this.state.cols; i++){
      gridStruct[i] = [];
      for (let j = 0; j < this.state.rows; j++)
      gridStruct[i].push(0)
    }
    this.setState({gridStruct: gridStruct})
  }

  updateGridDimension = (event) =>{
    clearInterval(this.intervalID);
    event.preventDefault();
    const data = new FormData(event.target);
    let rows = data.get('rows');
    let columns = data.get('columns');
    let gridStruct = [];
    for(let i = 0; i < columns; i++){
      gridStruct[i] = [];
      for (let j = 0; j < rows; j++)
      gridStruct[i].push(0)
    }
    this.setState({
      rows: rows,
      cols: columns,
      generation: 0,
      gridStruct: gridStruct
    })
    document.querySelector("html").style.setProperty("--rowNum", data.get('rows'));
    document.querySelector("html").style.setProperty("--colNum", data.get('columns'));
  }


  getGridPos = (event) => {
    event.target.classList.contains('redcell') ? event.target.classList.remove('redcell') : event.target.classList.add('redcell')
    let cellnumber = event.target.getAttribute('cellnumber');
    let column = (cellnumber % this.state.rows);
    let row = (cellnumber - column) / this.state.cols;
    let newGrid = this.state.gridStruct;
    newGrid[row][column] == 1 ? newGrid[row][column] = 0 : newGrid[row][column] = 1
    this.setState({gridStruct: newGrid})
  }

  gridToText = () => {
    let textGrid = "";
    this.state.gridStruct.forEach((instance) => {
      textGrid += instance.join('');
      textGrid += ' ';
    })
    this.setState({startpos: textGrid})
  }
  render() {
    return (
      <div className="App">
          <div onClick={() => {
              clearInterval(this.intervalID);
              this.intervalID = setInterval(this.colorCells, 400)}
            }>Click Me</div>
          <Form updateGridDimension={this.updateGridDimension}/>
          <Board rows={this.state.rows} cols={this.state.cols} getGridPos={this.getGridPos}/>
      </div>
    );
  }
}

export default App;
