import React, {Component} from 'react';
import './Grid.css';
import Pixel from './Pixel';

class Grid extends Component {
    
    render(){
        const width = this.props.columns*16;
        var rowsArr = [];
        var boxClass = '';
        for (var i =0; i< this.props.rows; i++) {
            for (var j= 0; j<this.props.columns; j++) {
                let boxId = i + '_'+ j;

                boxClass = this.props.gridFull[i][j] ? 'box on' : 'box off';
                rowsArr.push(
                    <Pixel
                        boxClass={boxClass}
                        key={boxId}
                        boxId= {boxId}
                        row={i}
                        columns={j}
                        selectBox={this.props.selectBox}
                    />
                );
            }
        }
        return (
            <div className='Grid' style={{width: width}}>
                {rowsArr}
                
            </div>
        )
    }
}




export default Grid; 