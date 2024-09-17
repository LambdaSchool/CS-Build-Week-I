import React, { Component } from 'react';
import './components.css';
import Cell from './Cell';

class Grid extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {
        console.log('Grid props: ', this.props)
        const width = (this.props.cols * 14);
        let arrCells = [];
        let boxClassName = "";
        for (let i = 0; i < this.props.rows; i++) {
            for (let j = 0; j < this.props.cols; j++) {
                let boxId = i + '-' + j;

                boxClassName = this.props.grid[i][j] ? "cell black" : "cell white";
                arrCells.push(
                    <Cell
                        boxClassName={boxClassName}
                        key={boxId}
                        boxId={boxId}
                        row={i}
                        col={j}
                        handleClick={this.props.handleClick}
                    />
                );
            }
        }
        return (
            <div>
                <div className='grid' style={{ width: width }}>
                    {arrCells}
                </div>
            </div>
        )
    }
}

export default Grid;