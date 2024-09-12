import React, {Component} from 'react';
import './Presets.css';

class Presets extends Component {
    render() {
        return (
            <div className="Presets">
                <button>Preset 1</button>
                <button>Preset 2</button>
                <button onClick={this.props.randomize}>Random</button>
            </div>
        )
    }
}

export default Presets;