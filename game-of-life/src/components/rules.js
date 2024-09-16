  
import React, { Component } from 'react';

class Rules extends Component {
  render(){
    return (
      <div className="rules">
        <h3 className="infotext">Rules</h3>
        <p>
          • Create an initial configuration or press the randomize button above to make a layout of the grid and watch how it evolves. ☢<br/>
          • If the cell is alive and has 2 or 3 neighbors, then it remains alive. Else it dies. ☠<br/>
          • If the cell is dead and has exactly 3 neighbors, then it comes to life. Else if remains dead.☠  
        </p>
      </div>
    );
  }
}


export default Rules;