import React, { Component } from 'react';

class Cell extends Component {
    constructor(props) {
        super(props);
        this.state = {
          is_alive: false,
        };
    }

    render() { 
        return ( 
            <div className="cellContainer"></div>
        );
    }
}
 
export default Cell;