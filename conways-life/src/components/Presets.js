import React from 'react';

const Presets = (props) => {
    return (
      <div>
          <div>
              <button>Preset 1</button>
          </div>
          <div>
              <button>Preset 2</button>
          </div>
          <div>
              <button>Preset 3</button>
          </div>
          <div>
              <button>Preset 4</button>
          </div>
          <div>
              <input
                name="speed"
                value={props.speed}
                onChange={props.handleSpeed}
              />
          </div>
      </div>
    );
};

export default Presets;