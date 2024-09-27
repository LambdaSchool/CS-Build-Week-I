import React, { Component } from 'react';


const cellSize = 16;


class Cell extends Component {
    render() {
        const { x, y } = this.props;
        return(
            <div className="cell"
                style={{
                    left: `${cellSize * x + 1}px`,
                    top: `${cellSize * y + 1}px`,
                    width: `${cellSize - 1}px`,
                    height: `${cellSize - 1}px`,
                }}
            />            
        );
    }
}
export default Cell;
