import React from 'react';
import Styled from 'styled-components';
import Cell from "./Cell";

const GridBox = Styled.div`
    display: flex;
    flex-wrap: wrap;
`;

class Head extends React.Component {
    constructor(props){
        super(props);
        this.speed = 300;
        this.rows = 2;
        this.cols = 70;
        this.state = {
          gridFull: Array(this.rows).fill().map(() => Array(this.cols).fill(false)),
        }
      }

      play = () => {
        let g2 = arrayClone(this.state.gridFull);
    
        for(let i = 0; i < this.rows; i++) {
          for(let j=0; j< this.cols; j++) {
            if(g2[i][j] == false){
                g2[i][j] = true;
                g2[i][j-1] = false;
                g2[i][j+1] = true;
              }
            else if(g2[i][j] == true){
                g2[i][j] = false;
                g2[i][j-1] = true;
                g2[i][j+1] = false;
              }
            }

        }
        this.setState({gridFull: g2})
    }

      startGame = () => {
        console.log("started!")
        clearInterval(this.intervalId);
        this.intervalId = setInterval(this.play, this.speed)
        this.play();
      }

      
      selectBox = (row, col) => {
        let grid = arrayClone(this.state.gridFull);
        grid[row][col] = !grid[row][col];
            this.setState({gridFull: grid});
      }

      seedGrid = () => {
        let grid = arrayClone(this.state.gridFull);
        for(let i = 0; i < this.rows; i++) {
          for(let j=0; j< this.cols; j++) {
            if(j % 2 == 0) {
              grid[i][j] = true;
            }
          }
        }
        this.setState({gridFull: grid});
      }

      componentDidMount() {
          this.seedGrid();
          this.startGame();
      }

	render() {
		const width = (this.cols * 20);
		var rowsArr = [];

		var boxClass = "";
		for (var i = 0; i < this.rows; i++) {
			for (var j = 0; j < this.cols; j++) {
				let boxId = i + "_" + j;

				boxClass = this.state.gridFull[i][j] ? "alive" : "dead";
				rowsArr.push(
					<Cell
						cellClass={boxClass}
						key={boxId}
						boxId={boxId}
						row={i}
						col={j}
						selectBox={this.selectBox}
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
function arrayClone (arr) {
    return JSON.parse(JSON.stringify(arr));
  }

export default Head;