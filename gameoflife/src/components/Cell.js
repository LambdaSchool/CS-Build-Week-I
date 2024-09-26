import React from 'react';
import './index.css';
import CellConfigs from './CellConfigs';

class Cell extends React.Component {
	selectCell = () => {
	  this.props.selectCell(this.props.row, this.props.col);
	}

	render() {
    //console.log("CellConfigs ")
		return (
			<div
				className={`${this.props.cellClass} cell`}
				id={this.props.id}
        onClick={this.selectCell}
			/>
		);
	}
}

export default Cell;