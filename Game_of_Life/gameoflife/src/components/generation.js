// functional component
import React, { useState } from 'react';

function Generation() {
    const [gen, setGen] = useState(0);

    const nextGen = () => {

    };

    return (
        <div>
            <h2>Generations: {nextGen}</h2>
        </div>
    )
};

export default Generation;

// class component

// import React from 'react';

// export default class Generation extends React.Component {
//     constructor() {
//         super();
//         this.state = {
//             generation: 0
//         }
//     }

//     render() {
//         return (
//         <h2>Generation: {this.state.generation}</h2>
//         )
//     }
// };