import React from 'react';
import '../index.css';
import Box from './Box.js';

class Grid extends React.Component {
    render() {
        const width = (this.props.cols * 14) + 1;
        let rowsArr = [];

        let boxClass = "";
        for (let i = 0; i < this.props.rows; i++){
            for (let j = 0; j < this.props.cols; j++){
                let boxId = i + "_" + j;
// ternary used to select box on (black) or off (on) when just hovering
                boxClass = this.props.gridFull[i][j] ? "box on" : "box off";
                rowsArr.push(
                    <Box
                        boxClass={boxClass}
                        key={boxId}
                        boxId={boxId}
                        row={i}
                        col={j}
                        selectBox={this.props.selectBox}
                    />
                );
            }
        }
// boxes pushed into array (rowsArr)
        return (
            <div className ="grid" style={{width: width}} >
               {rowsArr} 
            </div>
        );
    }    
}

export default Grid