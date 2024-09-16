import React from "react";
import { connect } from "react-redux";
import { updateBoxActiveState } from "../actions";

class Box extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.id,
      active: this.props.active
    };
  }

  onClickHandler = event => {
    if (!this.props.isRunning) {
      this.props.updateBoxActiveState(this.state.id);
    }
  };

  componentWillReceiveProps(newProps) {
    this.setState({ active: newProps.active });
  }

  render() {
    return (
      <div
        className={`box ${this.state.active ? "on" : "off"}`}
        onClick={this.onClickHandler}
      />
    );
  }
}

const mapStateToProps = state => {
  return {
    isRunning: state.isRunning,
    gridBoxArr: state.gridBoxArr
  };
};

export default connect(
  mapStateToProps,
  { updateBoxActiveState }
)(Box);
