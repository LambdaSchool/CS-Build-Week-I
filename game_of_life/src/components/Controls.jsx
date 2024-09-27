import React from 'react';
import Play from '../utils/play_button.jpg';
import Fastforward from '../utils/fastforward_button.jpg';
import Pause from '../utils/pause_button.png';
import '../scss/Controls.scss';

const Controls = props => {
    const makeGridSmall = () => {
        props.gridSize("small")
    }

    const makeGridRegular = () => {
        props.gridSize("regular")
    }

    const makeGridLarge = () => {
        props.gridSize("large")
    }
    
    return (
        <div className="controls">
            <img
                onClick={props.play}
                src={Play} 
            />
            <img
                onClick={props.fastforward}
                src={Fastforward} 
            />
            <img
                onClick={props.pause}
                src={Pause} 
            />
            <div 
                className="button"
                onClick={props.clear}
            >Clear</div>
            <div 
                className="button popout"
            >Size
                <div className="menu">
                    <p onClick={makeGridSmall}>Small</p>
                    <p onClick={makeGridRegular}>Regular</p>
                    <p onClick={makeGridLarge}>Large</p>
                </div>
            </div>
        </div>
    )
}

export default Controls;
