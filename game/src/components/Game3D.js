import React from 'react';
import {smallClear} from './smallClear';
import {smallFirst} from './smallFirst';
import {smallSecond} from './smallSecond';
import {mediumClear} from './mediumClear';
import {mediumFirst} from './mediumFirst';
import {mediumSecond} from './mediumSecond';
import {largeClear} from './largeClear';
import {largeFirst} from './largeFirst';
import {largeSecond} from './largeSecond';
import {configBlinker} from './configBlinker';
import {configBeacon} from './configBeacon';
import {configToad} from './configToad';
import {configGlider} from './configGlider';
import {configPulsar} from './configPulsar';
import {configGggun} from './configGggun';
import ThreeScene from './ThreeScene';


let myReq;
let myInt;
let speed = 1000;
let clearMatrix = mediumClear;
let firstMatrix = mediumFirst;
let secondMatrix = mediumSecond;
let generationCount = 1;

class Game3D extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            array1: mediumClear,
            continueAnimating: false,
            cycle: 'A',
            buttonTag: 'Start',
            speed: 200,
            boardSize: "medium",
            numX: 50,
            numY: 50,
            cellSize: 15,
            configuration: ''
        }
    }

    componentDidMount = () => {
        // this.drawBoard();
        // requestAnimationFrame((timestamp) => {this.onAnimFrame(timestamp)});
    }

    componentDidUpdate = () => {
        if (!this.state.continueAnimating) {
            this.toggleSquares();
        }
    }

    componentWillUnmount = () => {
        this.setState({continueAnimating: false});
    }

    drawBoard = () => {
        let canvas = this.refs.canvas;
        let context = canvas.getContext('2d');

        for (let x = 0.5; x < this.state.numX * this.state.cellSize + 1; x += this.state.cellSize) {
            context.moveTo(x, 0);
            context.lineTo(x, (this.state.numX +1) * this.state.cellSize);
        }

        for (let y = 0.5; y < (this.state.numY + 1) * this.state.cellSize; y += this.state.cellSize) {
            context.moveTo(0, y);
            context.lineTo((this.state.numX +1) * this.state.cellSize, y);
        }

        context.strokeStyle = "#000";
        context.stroke();

        // canvas.addEventListener('click', function(event) {
        //     if (!this.state.continueAnimating) {
        //         let xCoord = Number((Math.ceil((event.pageX - rect.left) / this.state.cellSize))) - 1;
        //         let yCoord = Number((Math.ceil((event.pageY - rect.top) / this.state.cellSize))) - 1;
        //         console.log("rect.left: ", rect.left);
        //         console.log("rect.top: ", rect.top);
        //         console.log("xCoord: ", xCoord);
        //         console.log("pageX:", event.pageX);
        //         console.log("yCoord: ", yCoord);
        //         console.log("pageY:", event.pageY);
        //         firstMatrix[yCoord][xCoord] = firstMatrix[yCoord][xCoord] === 1 ? 0 : 1;
        //         this.setState({array1: firstMatrix});
        //         }
        //     }.bind(this), 1);

        // for (let i = 0; i < 80; i++) {
        //     for (let j = 0; j < 190; j++) {
        //         if (this.state.array1[i][j]) {
        //             context.fillStyle = "yellow";
        //             context.fillRect(j * this.state.cellSize + 1, i * this.state.cellSize + 1, 9, 9);
        //         } else {
        //             context.fillStyle = "dodgerblue";
        //             context.fillRect(j * this.state.cellSize + 1, i this.state.cellSize + 1, 9, 9);
        //         }
        //     }
        // }
    }

    toggleSquares = () => {
        const canvas = this.refs.canvas;
        const context = canvas.getContext('2d');
        for (let i = 0; i < this.state.numY; i++) {
            for (let j = 0; j <= this.state.numX; j++) {
                if (this.state.array1[i][j]) {
                    context.fillStyle = "yellow";
                    context.fillRect(j * this.state.cellSize + 1, i * this.state.cellSize + 1, this.state.cellSize-1, this.state.cellSize-1);
                } else {
                    context.fillStyle = "dodgerblue";
                    context.fillRect(j * this.state.cellSize + 1, i * this.state.cellSize + 1, this.state.cellSize-1, this.state.cellSize-1);
                }
            }
        }
    }

    onAnimFrame = (timestamp) => {
        if (this.state.cycle === 'A') {
            if (this.state.continueAnimating === true) {
                myReq = requestAnimationFrame((timestamp) => {myInt = setTimeout(() => {this.onAnimFrame(timestamp)}, this.state.speed)});
                
                const canvas = this.refs.canvas;
                const context = canvas.getContext('2d');
                for (let i = 0; i < this.state.numY; i++) {
                    for (let j = 0; j <= this.state.numX; j++) {
                        if (this.state.array1[i][j]) {
                            context.fillStyle = "yellow";
                            context.fillRect(j * this.state.cellSize + 1, i * this.state.cellSize + 1, this.state.cellSize-1, this.state.cellSize-1);
                        } else {
                            context.fillStyle = "dodgerblue";
                            context.fillRect(j * this.state.cellSize + 1, i * this.state.cellSize + 1, this.state.cellSize-1, this.state.cellSize-1);
                        }
                    }
                }
                // set the next buffer
                for (let i = 0; i < this.state.numY; i++) {
                    for (let j = 0; j <= this.state.numX; j++) {
                        // wrap around
                        let prevRow = i - 1;
                        if (prevRow === -1) {
                            prevRow = this.state.numY - 1;
                        }
                        let nextRow = i + 1;
                        if (nextRow === this.state.numY) {
                            nextRow = 0
                        }
                        let prevCol = j - 1;
                        if (prevCol === -1) {
                            prevCol = this.state.numX - 1;
                        }
                        let nextCol = j + 1;
                        if (nextCol === this.state.numX) {
                            nextCol = 0;
                        }

                        // count living neighbors
                        let count = 0;
                        if (firstMatrix[prevRow][prevCol]) {
                            count++;
                        }
                        if (firstMatrix[prevRow][j]) {
                            count++;
                        }
                        if (firstMatrix[prevRow][nextCol]) {
                            count++;
                        }
                        if (firstMatrix[i][prevCol]) {
                            count++;
                        }
                        if (firstMatrix[i][nextCol]) {
                            count++;
                        }
                        if (firstMatrix[nextRow][prevCol]) {
                            count++;
                        }
                        if (firstMatrix[nextRow][j]) {
                            count++;
                        }
                        if (firstMatrix[nextRow][nextCol]) {
                            count++;
                        }

                        // toggle state based on neighbors
                        if ((firstMatrix[i][j] === 1) && (count < 2)) {
                            secondMatrix[i][j] = 0;
                            console.log(firstMatrix[i][j], count);
                        } else if ((firstMatrix[i][j] === 1) && (count === 2 || count === 3)) {
                            secondMatrix[i][j] = 1;
                            console.log(firstMatrix[i][j], count);
                        } else if ((firstMatrix[i][j] === 1) && (count > 3)) {
                            secondMatrix[i][j] = 0;
                            console.log(firstMatrix[i][j], count);
                        } else if ((firstMatrix[i][j] === 0) && (count === 3)) {
                            secondMatrix[i][j] = 1;
                            console.log(firstMatrix[i][j], count);
                        } else if ((firstMatrix[i][j] === 0) && (count !== 3)) {
                            secondMatrix[i][j] = 0;
                        }
                    }
                }
                this.setState({array1: secondMatrix});
                this.setState({cycle: 'B'});
                generationCount++;
            } else {
                cancelAnimationFrame(myReq);
            }
        } else {
            if (this.state.continueAnimating === true) {
                myReq = requestAnimationFrame((timestamp) => {myInt = setTimeout(() => {this.onAnimFrame(timestamp)}, this.state.speed)});
            
                const canvas = this.refs.canvas;
                const context = canvas.getContext('2d');
                for (let i = 0; i < this.state.numY; i++) {
                    for (let j = 0; j <= this.state.numX; j++) {
                        if (this.state.array1[i][j]) {
                            context.fillStyle = "yellow";
                            context.fillRect(j * this.state.cellSize + 1, i * this.state.cellSize + 1, this.state.cellSize-1, this.state.cellSize-1);
                        } else {
                            context.fillStyle = "dodgerblue";
                            context.fillRect(j * this.state.cellSize + 1, i * this.state.cellSize + 1, this.state.cellSize-1, this.state.cellSize-1);
                        }
                    }
                }
                // set the next buffer
                for (let i = 0; i < this.state.numY; i++) {
                    for (let j = 0; j <= this.state.numX; j++) {
                        // wrap around
                        let prevRow = i - 1;
                        if (prevRow === -1) {
                            prevRow = this.state.numY - 1;
                        }
                        let nextRow = i + 1;
                        if (nextRow === this.state.numY) {
                            nextRow = 0
                        }
                        let prevCol = j - 1;
                        if (prevCol === -1) {
                            prevCol = this.state.numX - 1;
                        }
                        let nextCol = j + 1;
                        if (nextCol === this.state.numX) {
                            nextCol = 0;
                        }

                        // count living neighbors
                        let count = 0;
                        if (secondMatrix[prevRow][prevCol]) {
                            count++;
                        }
                        if (secondMatrix[prevRow][j]) {
                            count++;
                        }
                        if (secondMatrix[prevRow][nextCol]) {
                            count++;
                        }
                        if (secondMatrix[i][prevCol]) {
                            count++;
                        }
                        if (secondMatrix[i][nextCol]) {
                            count++;
                        }
                        if (secondMatrix[nextRow][prevCol]) {
                            count++;
                        }
                        if (secondMatrix[nextRow][j]) {
                            count++;
                        }
                        if (secondMatrix[nextRow][nextCol]) {
                            count++;
                        }

                        // toggle state based on neighbors
                        if ((secondMatrix[i][j] === 1) && (count < 2)) {
                            firstMatrix[i][j] = 0;
                            console.log(secondMatrix[i][j], count);
                        } else if ((secondMatrix[i][j] === 1) && (count === 2 || count === 3)) {
                            firstMatrix[i][j] = 1;
                            console.log(secondMatrix[i][j], count);
                        } else if ((secondMatrix[i][j] === 1) && (count > 3)) {
                            firstMatrix[i][j] = 0;
                            console.log(secondMatrix[i][j], count);
                        } else if ((secondMatrix[i][j] === 0) && (count === 3)) {
                            firstMatrix[i][j] = 1;
                            console.log(secondMatrix[i][j], count);
                        } else if ((secondMatrix[i][j] === 0) && (count !== 3)) {
                            firstMatrix[i][j] = 0;
                        }
                    }
                }
                this.setState({array1: firstMatrix});
                this.setState({cycle: 'A'});
                generationCount++;
            } else {
                cancelAnimationFrame(myReq);
            }
        }
    }

    toggleButton = () => {
        if (this.state.continueAnimating === true) {
            this.setState({continueAnimating: false});
            cancelAnimationFrame(myReq);
            clearInterval(myInt);
        } else {
            this.setState({continueAnimating: true});
            myReq = requestAnimationFrame((timestamp) => {myInt = setTimeout(() => {this.onAnimFrame(timestamp)}, this.state.speed)});
        }
        if (this.state.buttonTag === 'Start') {
            this.setState({buttonTag: 'Stop'});
        } else {
            this.setState({buttonTag: 'Start'});
        }
    }

    clearGrid = () => {
        for (let i = 0; i < this.state.numY; i++) {
            firstMatrix[i] = clearMatrix[i].slice();
            secondMatrix[i] = clearMatrix[i].slice();
        }
        this.setState({array1: clearMatrix});
        generationCount = 1;
    }

    changeSpeed = (newSpeed) => {
        speed = newSpeed;
        this.setState(function() {
            return {speed: speed}
        });
        console.log("Speed: ", this.state.speed);
        clearInterval(myInt);
        cancelAnimationFrame(myReq);
        if (this.state.continueAnimating) {
            myReq = requestAnimationFrame((timestamp) => {myInt = setTimeout(() => {this.onAnimFrame(timestamp)}, this.state.speed)});
        }
    }

    changeBoardSize = (size) => {
        if (size === "small") {
            this.setState({array1: smallClear});
            this.setState({boardSize: "small", numX: 15, numY: 15, cellSize: 30});
            clearMatrix = smallClear;
            firstMatrix = smallFirst;
            secondMatrix = smallSecond;
        } else if (size === "medium") {
            this.setState({array1: mediumClear});
            this.setState({boardSize: "medium", numX: 50, numY: 50, cellSize: 15});
            clearMatrix = mediumClear;
            firstMatrix = mediumFirst;
            secondMatrix = mediumSecond;
        } else {
            this.setState({array1: largeClear});
            this.setState({boardSize: "large", numX: 190, numY: 80, cellSize: 10});
            clearMatrix = largeClear;
            firstMatrix = largeFirst;
            secondMatrix = largeSecond;
        }
        setTimeout(() => this.drawBoard(), 10);
    }

    canvasOnClick = (event) => {
        let canvas = this.refs.canvas;
        let rect = canvas.getBoundingClientRect();

        if (!this.state.continueAnimating) {
            let xCoord = Number((Math.ceil((event.pageX - rect.left) / this.state.cellSize))) - 1;
            let yCoord = Number((Math.ceil((event.pageY - rect.top) / this.state.cellSize))) - 1;
            console.log("rect.left: ", rect.left);
            console.log("rect.top: ", rect.top);
            console.log("xCoord: ", xCoord);
            console.log("pageX:", event.pageX);
            console.log("yCoord: ", yCoord);
            console.log("pageY:", event.pageY);
            firstMatrix[yCoord][xCoord] = firstMatrix[yCoord][xCoord] === 1 ? 0 : 1;
            this.setState({array1: firstMatrix});
            }
    }

    generateRandom = () => {
        if (!this.state.continueAnimating) {
            for (let i = 0; i < this.state.numY; i++) {
                for (let j = 0; j < this.state.numX; j++) {
                    firstMatrix[i][j] = Math.round(Math.random());
                }
            }
            this.setState({array1: firstMatrix});
        }
    }

    pickConfiguration = (config) => {
        this.setState({configuration: config})
        if (config === "blinker") {
            for (let i = 0; i < 15; i++) {
                firstMatrix[i] = configBlinker[i].slice();
            }
        } else if (config === "beacon") {
            for (let i = 0; i < 15; i++) {
                firstMatrix[i] = configBeacon[i].slice();
            }
        } else if (config === "toad") {
            for (let i = 0; i < 15; i++) {
                firstMatrix[i] = configToad[i].slice();
            }
        } else if (config === "glider") {
            for (let i = 0; i < 15; i++) {
                firstMatrix[i] = configGlider[i].slice();
            }
        } else if (config === "pulsar") {
            for (let i = 0; i < 50; i++) {
                firstMatrix[i] = configPulsar[i].slice();
            }
        } else if (config === "gggun") {
            for (let i = 0; i < 80; i++) {
                firstMatrix[i] = configGggun[i].slice();
            }
        }
        this.setState({array1: firstMatrix});
    }

    render() {
        return (
            <div className="gameDiv">
                <div>
                    {/* <canvas ref="canvas" id="gameCanvas" width={(this.state.numX + 1) *this.state.cellSize + 1} height={this.state.numY * this.state.cellSize + 1} onClick={this.canvasOnClick} /> */}
                    <ThreeScene />
                </div>
                {/* <div>
                    <button onClick={this.toggleButton}>{this.state.buttonTag}</button>
                    <button onClick={this.clearGrid}>Clear</button>
                    <button onClick={() => this.changeSpeed(800)}>></button>
                    <button onClick={() => this.changeSpeed(200)}>>></button>
                    <button onClick={() => this.changeSpeed(50)}>>>></button>
                    <select value={this.state.boardSize} onChange={(e) => this.changeBoardSize(e.target.value)}>
                        <option value="small">Small</option>
                        <option selected value="medium">Medium</option>
                        <option value="large">Large</option>
                    </select>
                    {this.state.boardSize === "small" ? 
                    <select value={this.state.configuration} onChange={(e) => this.pickConfiguration(e.target.value)} >
                        <option value="none">Select a configuration:</option>
                        <option value="glider">Glider</option>
                        <option value="blinker">Blinker</option>
                        <option value="beacon">Beacon</option>
                        <option value="toad">Toad</option>
                    </select>
                    : null}
                    {this.state.boardSize === "medium" ? 
                    <select value={this.state.configuration} onChange={(e) => this.pickConfiguration(e.target.value)} >
                        <option value="none">Select a configuration:</option>
                        <option value="glider">Glider</option>
                        <option value="blinker">Blinker</option>
                        <option value="beacon">Beacon</option>
                        <option value="toad">Toad</option>
                        <option value="pulsar">Pulsar</option>
                    </select>
                    : null}
                    {this.state.boardSize === "large" ? 
                    <select value={this.state.configuration} onChange={(e) => this.pickConfiguration(e.target.value)} >
                        <option value="none">Select a configuration:</option>
                        <option value="glider">Glider</option>
                        <option value="blinker">Blinker</option>
                        <option value="beacon">Beacon</option>
                        <option value="toad">Toad</option>
                        <option value="pulsar">Pulsar</option>
                        <option value="gggun">Gosper Glider Gun</option>
                    </select>
                    : null}
                    <button onClick={this.generateRandom}>Random</button>
                    Generation: {generationCount}
                </div> */}
            </div>
        );
    }
}

export default Game3D;