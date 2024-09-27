import React, { Component } from 'react';
import {Cells} from '../theme/css';

class Cell extends Component {
    render() {
        return(
        <Cells onClick={() => this.props.storeCell(this.props.position)} />
        )
    }
}

export default Cell;