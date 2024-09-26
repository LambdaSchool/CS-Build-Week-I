import React, { Component } from 'react';
import Cell from './cell';
import ReactTimeout from "react-timeout";

class CellGrid extends Component {
    constructor(props) {
        super(props);
        this.liveCells = new Map();
        this.buffer = new Map();
        this.deadCells = new Map();
        this.state = {
            size: [30, 30],
            generation: 0,
            cellChange: 0,
            interval: 100,
            simActive: false
        }
    }


    addLiveCell(position) {
        this.liveCells.set(position.x + ' , ' + position.y, { x: position.x, y: position.y });
    }

    removeDeadCell(position) {
        this.liveCells.delete(position);
    }

    isCellAlive(position) {
        return this.liveCells.has(position);
    }

    isCellInBuffer(position) {
        return this.buffer.has(position);
    }

    liveNeighbors(position) {
        let liveNeighbors = 0;

        for (let i = position.x - 1; i <= position.x + 1; i++) {
            for (let j = position.y - 1; j <= position.y + 1; j++) {

                if (i === position.x && j === position.y)
                    continue;

                if (this.isCellAlive(i + ' , ' + j)) {
                    liveNeighbors++;
                }


                else
                    this.deadCells.set(i + ' , ' + j, { x: i, y: j });
            }
        }

        if ((liveNeighbors === 2 || liveNeighbors === 3))
            this.buffer.set(position.x + ' , ' + position.y, { x: position.x, y: position.y });

    }

    randomCells() {
        this.liveCells.forEach((item) => {
            this.removeDeadCell(item.x + ' , ' + item.y);
        })
        
        for (let i = 0; i < this.state.size[0]; i++) {
            for (let j = 0; j < this.state.size[1]; j++){
                let random = Math.floor((Math.random() * 100) + 1);
                if(random > 80)
                 this.addLiveCell({x: i, y: j});
            }
        }
        this.setState({cellChange: -1});
    }

    deadNeighbors(position) {
        let liveNeighbors = 0;

        for (let i = position.x - 1; i <= position.x + 1; i++) {
            for (let j = position.y - 1; j <= position.y + 1; j++) {

                if (i === position.x && j === position.y)
                    continue;

                if (this.isCellAlive(i + ' , ' + j))
                    liveNeighbors++;
            }
        }

        if ((liveNeighbors === 3))
            this.buffer.set(position.x + ' , ' + position.y, { x: position.x, y: position.y });
    }

    storeCell(position) {
        if (this.isCellAlive(position.x + ' , ' + position.y)) {
            this.removeDeadCell(position.x + ' , ' + position.y);
        }

        else
            this.addLiveCell(position);
        this.setState({ cellCount: position });


    }

    addBuffer() {
        this.liveCells.forEach((i) => {
            this.liveNeighbors(i);
        })

        this.deadCells.forEach((i) => {
            this.deadNeighbors(i);
        })

        this.liveCells = this.buffer;
        this.buffer = new Map();
        this.deadCells = new Map();

        let generationplus = this.state.generation;
        generationplus++;
        this.setState({ generation: generationplus });

    }

    startSimulation() {
        if (this.state.simActive)
            return;
        this.setState({ simActive: true }, () => this.runSimulation());


    }

    runSimulation() {
        if(!this.state.simActive)
            return;
        this.addBuffer();
        this.timeout = setTimeout(() => {
            this.runSimulation();
        }, this.state.interval);
    }

    stopSimulation() {
        if (!this.state.simActive)
            return;
        this.setState({ simActive: false });
        clearTimeout(this.timeout);
    }

    clearGrid() {
        this.liveCells.forEach((item) => {
            this.removeDeadCell(item.x + ' , ' + item.y);
        })

        this.setState({generation: 0, simActive: false});

    }

    intervalHandler = (event) => {
        event.preventDefault();
        if(!this.state.simActive)
            this.setState({interval: event.target.value});
    }

    changeXhandler = (event) => {
        event.preventDefault();
        if(event.target.value <= 50){
            let nuSize = this.state.size.slice();
            nuSize[0] = event.target.value;
            this.setState({size: nuSize});
        }
    }

    changeYhandler = (event) => {
        event.preventDefault();
        if(event.target.value <= 50){
            let nuSize = this.state.size.slice();
            nuSize[1] = event.target.value;
            this.setState({size: nuSize});
        }

    }

    renderGrid() {
        let newGrid = [];
        let cellRow = [];

        for (let i = 0; i < this.state.size[0]; i++) {
            for (let j = 0; j < this.state.size[1]; j++) {
                if (this.isCellAlive(i + ' , ' + j)) {
                    cellRow.push(<Cell key={[i, j]} position={{ x: i, y: j }} storeCell={this.storeCell.bind(this)} isAlive={true} />);
                }
                else
                    cellRow.push(<Cell key={[i, j]} position={{ x: i, y: j }} storeCell={this.storeCell.bind(this)} isAlive={false} />);
            }
            newGrid.push(<div className="row" key={i}>{cellRow}</div>)
            cellRow = [];
        }
        return newGrid;
    }


    render() {
        return <div className="app-container"> 
                <div className="grid-container">
                        {this.renderGrid()}
                    </div>
                <div className="controls-container">
                    <div className="buttons-container">
                        <button onClick={() => this.startSimulation()}>Start Simulation </button>
                        <button onClick={() => this.stopSimulation()}>Stop</button>
                        <button onClick={() => this.clearGrid()}> Clear Grid</button>
                        <button onClick={() => this.randomCells()}> Randomize </button>
                        </div>
                    <div className="stats-container">
                    <a> Generation: {this.state.generation} </a>
                    <a> Interval: 
                    <input className="input" type="text" value={this.state.interval} onChange={this.intervalHandler} />
                    ms
                    </a>
                    <a> Size: 
                    <input className="input" type="text" value={this.state.size[0]} onChange={this.changeXhandler}/> x
                    <input className="input" type="text" value={this.state.size[1]} onChange={this.changeYhandler}/>
                     </a>
                    </div>
                </div>
        </div>

    }


}

export default CellGrid;