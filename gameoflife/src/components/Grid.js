import React, {Component} from 'react';
import './index.css';
import Cell from './Cell';
import CellConfigs from './CellConfigs';

const cellConfigs = CellConfigs();

class Grid extends Component {

	render() {
    const rowsArr = [];
    let cellClass = "";
    
		for (let i = 0; i < this.props.rows; i++) {
			for (let j = 0; j < this.props.cols; j++) {
				let cellId = i + "_" + j;
        //console.log("cellId: ", cellId)
        cellClass = this.props.gridFull[i][j] ? "box on" : "box off";
        //console.log("cellClass: ", cellClass)
				rowsArr.push(
					<Cell
						cellClass={cellClass}
						key={cellId}
						cellId={cellId}
						row={i}
						col={j}
            selectCell={this.props.selectCell}
            config1State={this.props.config1State}
					/>
				);
			}
    }
    
    // console.log('CellCongigs', cellConfigs)
    console.log("this.props.config1State :", this.props.config1State)
    console.log(this.props)
		return (
      <div className="grid">
        {rowsArr}
			</div>
    );
  }

}

export default Grid;