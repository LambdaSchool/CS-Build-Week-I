import React from "react";
import "../index.css";
import { ButtonToolbar, MenuItem, DropdownButton, Button } from 'react-bootstrap';


class Buttons extends React.Component {

    handleSelect = (evt) => {
        this.props.gridSize(evt);
    }


    render() {
        return (
        <div className="center">
            <ButtonToolbar>
              <Button bsStyle="primary" onClick={this.props.startButton}>
                Start
              </Button>
              <Button bsStyle="danger" onClick={this.props.stopButton}>
                Stop
              </Button>
              <Button bsStyle="success" onClick={this.props.clear}>
                Clear
              </Button>
              <Button bsStyle="warning" onClick={this.props.slow}>
                Slow
              </Button>
              <Button bsStyle="danger" onClick={this.props.fast}>
                Fast
              </Button>
              <Button bsStyle="info" onClick={this.props.seed}>
                Seed
              </Button>
              <DropdownButton
                title="Grids"
                id="size-menu"
                onSelect={this.handleSelect}
                >
                <MenuItem eventKey="1">30x20</MenuItem>
                <MenuItem eventKey="2">60x40</MenuItem>
                <MenuItem eventKey="3">80x60</MenuItem>
               </DropdownButton>
            </ButtonToolbar>
        </div>    
        )
    }

}

export default Buttons