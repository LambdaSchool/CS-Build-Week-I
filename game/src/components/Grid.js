import React, { Component } from 'react';
import Controls from './Controls';
import Cell from './Cell';
import Generate from './Generate';
import {GridContainer, GridStyle, LabelStyling} from '../theme/css';

export default class Grid extends Component {
    constructor(props) {
        super(props)
        this.state = {
            Generate: new Generate(),
            size: [15, 15],
            isRunning: false
        }
    }

    gridSize = () => {
        let cellColumn = [];
        let cellRow = [];

        for(let i = 0; i < this.state.size[0]; i++) {
            for(let j = 0; j < this.state.size[1]; j++) {
                cellRow.push(<Cell key={[i,j]} />);
            }
            cellColumn.push(<div key={i}>{cellRow}</div>)
            cellRow = [];
        }

        return cellColumn;
    }

    handleRow = (event) => {
        if(!this.state.isRunning) {
            let actualSize = this.state.size;
            if(event.target.value < 15)
                actualSize[1] = event.target.value;
                else
                actualSize[1] = 15;

                this.setState({
                    size: actualSize,
                });

                this.gridSize()
            }
    }

    handleColumn = (event) => {
        if(!this.state.isRunning) {
            let actualSize = this.state.size;
            if(event.target.value < 15)
                actualSize[0] = event.target.value
            else
                actualSize[0] = 15
            
            this.setState({
                size: actualSize
            })

            this.gridSize()
        }
    }

    runGame = () => {
        this.setState({
            Generate: this.state.Generate.addGeneration()
        })
    }

    start = () => {
        if(!this.state.isRunning){
            this.setState({
                isRunning: true
            }, () => {
                this.intervalRef = setInterval(() => this.runGame(), 10);
            })
        }
    }

    stop = () => {
        this.setState({
            isRunning: false,
        }, () => {
            if(this.intervalRef) {
                clearInterval(this.intervalRef)
            }
        })
    }

    storeCell = (position) => {
        if(!this.state.isRunning) {
            this.setState({
                Generate: this.state.Generate.storeCell(position)
            })
        }
    }

    render() {
        return(
        <GridContainer>
        <LabelStyling>
        <label>
            Rows:
            <input type="text" value={this.state.size[1]} onChange={this.handleRow}/>
        </label>
        <label>
            Columns:
            <input type="text" value={this.state.size[0]} onChange={this.handleColumn}/>
        </label>
        </LabelStyling>
        <div getGeneration={this.props.generation}>Generation</div>
        <GridStyle>{this.gridSize()}</GridStyle>
        <Controls start={this.start} stop={this.stop}/>
        </GridContainer>
        )
    }
}