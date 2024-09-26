import React from 'react';

const About = () => {
    return (
      <div>
          <h3>About this Algorithm:</h3>
          <p>How does Conway's Game of Life work? The game is seeded with an initial state and the cells evolve into the next generation based on the rules stated above.</p>
          <p>The game was created by the British mathematician John Horton Conway in 1970. This algorithm has proven useful, due to the fact that it resembles real life processes.
              The complex patterns that arise have shaped analogies in other fields of study such as mathematics and philosophy.
              The relation it has to Turing Completeness is that any pattern can be simulated within Life.</p>
      </div>
    );
};

export default About;