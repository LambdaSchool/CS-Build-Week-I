import React from 'react';
import styled from 'styled-components'
import '../App.css'
import Board from './Board'
import TopBar from './TopBar'
import SideBar from "./SideBar"


class Main extends React.Component {
    constructor() {
        super()
        this.state = {
            currentBoard: [],
            boardSize: 25,
            generation: 0,
            gameOn: false,
            gameSpeed: 100,
        };
    }

    createBoard = (newBoardSize) => {
        let newBoard = []

        for (let x = 0; x < newBoardSize; x++) {
            let rowOfCells = []
            for (let y = 0; y < newBoardSize; y++) {
                rowOfCells.push({
                    xVal: y,
                    yVal: x,
                    isAlive: false,
                });
            }
            newBoard.push(rowOfCells);
        }
        this.setState({
            currentBoard: newBoard
        })
    }

    setNewSize = (newBoardSize) => {
        this.setState({
            boardSize: newBoardSize
        });
        this.createBoard(newBoardSize)
    }

    componentDidMount() {
        this.setNewSize(this.state.boardSize)
    };


    clearBoard = () => {
        let newBoard = []
        for (let x = 0; x < this.state.boardSize; x++) {
            let rowOfCells = []
            for (let y = 0; y < this.state.boardSize; y++) {
                rowOfCells.push({
                    xVal: y,
                    yVal: x,
                    isAlive: false,
                });
            }
            newBoard.push(rowOfCells);
        }
        this.setState({
            currentBoard: newBoard,
            generation: 0,
            gameOn: false
        })
    }


    toggleCell = cell => {
        if (!this.state.gameOn) {

            let curBoard = this.state.currentBoard.slice();

            curBoard[cell.yVal][cell.xVal].isAlive = !cell.isAlive
            this.setState({
                currentBoard: curBoard
            });
        }


    };

    computeAlgorithm = () => {

        let nextGenBoard = [];
        const size = this.state.boardSize;

        for (let x = 0; x < size; x++) {
            let BoardRow = []
            for (let y = 0; y < size; y++) {
                BoardRow.push({ ...this.state.currentBoard[x][y] })

            }
            nextGenBoard.push(BoardRow);
        }

        for (let x = 0; x < size; x++) {
            for (let y = 0; y < size; y++) {
                let neighbors = 0;
                if (x < size - 1) {
                    if (this.state.currentBoard[y][x + 1].isAlive) {
                        neighbors++
                    }
                }
                if (y < size - 1 && x < size - 1) {
                    if (this.state.currentBoard[y + 1][x + 1].isAlive) {
                        neighbors++
                    }
                }
                if (y < size - 1) {
                    if (this.state.currentBoard[y + 1][x].isAlive) {
                        neighbors++
                    }
                }
                if (y < size - 1 && x > 0) {
                    if (this.state.currentBoard[y + 1][x - 1].isAlive) {
                        neighbors++
                    }
                }
                if (x > 0) {
                    if (this.state.currentBoard[y][x - 1].isAlive) {
                        neighbors++
                    }
                }

                if (x > 0 && y > 0) {
                    if (this.state.currentBoard[y - 1][x - 1].isAlive) {
                        neighbors++

                    }
                }

                if (y > 0) {
                    if (this.state.currentBoard[y - 1][x].isAlive) {
                        neighbors++

                    }
                }

                if (y > 0 && x < size - 1) {
                    if (this.state.currentBoard[y - 1][x + 1].isAlive) {
                        neighbors++

                    }
                }

                if (this.state.currentBoard[y][x].isAlive === false && neighbors === 3) {
                    nextGenBoard[y][x].isAlive = true;
                }

                if (this.state.currentBoard[y][x].isAlive === true && (neighbors > 3 || neighbors < 2)) {
                    nextGenBoard[y][x].isAlive = false;
                }
            }
        }

        this.setState({
            generation: this.state.generation + 1,
            currentBoard: nextGenBoard
        })
    }

    startGame = () => {
        this.setState({
            gameOn: true
        });
        this.nextGeneration()
    }

    nextGeneration = () => {
        this.computeAlgorithm();
        setTimeout(() => {
            if (this.state.gameOn) {

                this.nextGeneration()
            }
        }, this.state.gameSpeed)
    };


    stopGame = () => {
        this.setState({
            gameOn: false
        });
    };

    randomizeBoard = () => {
        let randomBoard = []
        for (let x = 0; x < this.state.boardSize; x++) {
            let rowOfCells = []
            for (let y = 0; y < this.state.boardSize; y++) {
                const random = !!Math.round(Math.random());
                rowOfCells.push({
                    xVal: y,
                    yVal: x,
                    isAlive: random,
                });
            }
            randomBoard.push(rowOfCells);
        }
        this.setState({
            currentBoard: randomBoard
        })
    }


    render() {

        return (
            <MainWrapper>
                <TopBar currentGeneration={this.state.generation} />
                <AppWrapper>
                    <Board currentBoard={this.state.currentBoard} size={this.state.boardSize} toggleAliveState={this.toggleCell} />
                    <SideBar
                        playGame={this.startGame}
                        stopGame={this.stopGame}
                        clearBoard={this.clearBoard}
                        randomBoard={this.randomizeBoard}
                        boardResize={this.setNewSize}
                    />
                </AppWrapper>
            </MainWrapper>


        );
    }
}

export default Main;

const MainWrapper = styled.div`

`

const AppWrapper = styled.div`
display: flex;
justify-content: space-evenly;
align-items: center;
margin-bottom: 20px;
`

