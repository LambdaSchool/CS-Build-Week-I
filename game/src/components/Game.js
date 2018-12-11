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


let myReq;
let myInt;
let speed = 1000;
let clearMatrix = mediumClear;
let firstMatrix = mediumFirst;
let secondMatrix = mediumSecond;

class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            array1: mediumClear,
            continueAnimating: false,
            cycle: 'A',
            buttonTag: 'Start',
            speed: 1000,
            boardSize: "medium",
            numX: 50,
            numY: 50,
            cellSize: 20,
            
        }
    }

    componentDidMount = () => {
        this.drawBoard();
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
        let rect = canvas.getBoundingClientRect();

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
                myReq = requestAnimationFrame((timestamp) => {myInt = setInterval(() => {this.onAnimFrame(timestamp)}, this.state.speed)});
                
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
            } else {
                cancelAnimationFrame(myReq);
            }
        } else {
            if (this.state.continueAnimating === true) {
                myReq = requestAnimationFrame((timestamp) => {myInt = setInterval(() => {this.onAnimFrame(timestamp)}, this.state.speed)});
            
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
            myReq = requestAnimationFrame((timestamp) => {myInt = setInterval(() => {this.onAnimFrame(timestamp)}, this.state.speed)});
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
            myReq = requestAnimationFrame((timestamp) => {myInt = setInterval(() => {this.onAnimFrame(timestamp)}, this.state.speed)});
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
            this.setState({boardSize: "medium", numX: 50, numY: 50, cellSize: 20});
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
        let context = canvas.getContext('2d');
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

    render() {
        return (
            <div>
                <canvas ref="canvas" id="gameCanvas" width={(this.state.numX + 1) *this.state.cellSize + 1} height={this.state.numY * this.state.cellSize + 1} onClick={this.canvasOnClick} />
                <button onClick={this.toggleButton}>{this.state.buttonTag}</button>
                <button onClick={this.clearGrid}>Clear</button>
                Speed:
                <button onClick={() => this.changeSpeed(2000)}>></button>
                <button onClick={() => this.changeSpeed(1000)}>>></button>
                <button onClick={() => this.changeSpeed(500)}>>>></button>
                Board Size:
                <select value={this.state.boardSize} onChange={(e) => this.changeBoardSize(e.target.value)}>
                    <option value="small">Small</option>
                    <option selected value="medium">Medium</option>
                    <option value="large">Large</option>
                </select>
            </div>
        );
    }
}

export default Game;