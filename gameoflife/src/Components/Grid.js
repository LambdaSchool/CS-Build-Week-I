import React from 'react';
import Styled from 'styled-components';
import Cell from "./Cell";

const GridBox = Styled.div`
    display: flex;
    flex-wrap: wrap;
    box-shadow: 6px 6px 29px -5px rgba(0,0,0,0.75);
`;

class Grid extends React.Component {
	render() {
		const width = (this.props.cols * 19);
		var rowsArr = [];

		var boxClass = "";
		for (var i = 0; i < this.props.rows; i++) {
			for (var j = 0; j < this.props.cols; j++) {
				let boxId = i + "_" + j;

				boxClass = this.props.gridFull[i][j] ? "alive" : "dead";
				rowsArr.push(
					<Cell
						cellClass={boxClass}
						key={boxId}
						boxId={boxId}
						row={i}
						col={j}
						selectBox={this.props.selectBox}
					/>
				);
			}
		}

		return (
			<GridBox style={{width: width}}>
				{rowsArr}
			</GridBox>
		);
	}
}

export default Grid;