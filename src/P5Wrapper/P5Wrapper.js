import React, { Component } from 'react';
import p5 from 'p5';

class P5Wrapper extends Component {
  constructor(props){
    super(props);
    this.state = {
      
    }
  }

  componentDidMount() {
    this.canvas = new p5(this.props.sketch, this.wrapper);
    if(this.canvas.arbitrary){
      this.canvas.arbitrary(this.props);
    }
  }

  componentWillReceiveProps(newprops) {
		if (this.canvas.arbitrary) {
			this.canvas.arbitrary(newprops);
		}
	}

  render() {
    return (
      <div ref={wrapper => this.wrapper = wrapper}></div>
    );
  }
}

export default P5Wrapper;