import React, {Component} from 'react';
import './Pixel.css';

class Pixel extends Component {
    selectBox = () => {
        this.props.selectBox(this.props.row, this.props.columns);
    }
    render() {
        return (
            <div
                className= {this.props.boxClass}
                id={this.props.id}
                onClick={this.selectBox}
            />
        );
    }
}

export default Pixel; 