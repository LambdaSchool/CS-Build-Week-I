import React, { Component } from 'react';

class ClearButton extends Component {
    constructor(props){
    super(props);
    this.state = { isToggleOn:true };
    //this binding is necessary to make 'this' work in the callback
    this.handleClick = this.handleClick.bind(this);
    }
handleClick = () =>{
    this.setState(state => ({
        isToggleOn: !state.isToggleOn
      }));
}

    render() { 
        return ( 
            <div>
            <button onClick={this.handleClick} class="clearbutton">
            {this.state.isToggleOn ? 'Start' : 'Stop'}
            </button>
            </div>
         );
    }
}
 
export default ClearButton;