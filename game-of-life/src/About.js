import React, { Component } from 'react';
import './App.css';

class About extends Component {

      render(){
      return(
        <div className = "text-block">
            <h4>
               About Conway's Game of Life
            </h4>
            <p>
                Conway's Game of Life is a model for cellular automata, which is a simplified model of cellular population growth and decline.
                Invented by John Conway, the game is known as a "zero player" game meaning that, aside from specifying an initial state, a player contributes nothing to the game's progression.
                The initial state is an arrangement of "live" and "dead" cells indicated by squares that are either filled or empty. 
                Once the game has begun, the cells change state based on four simple rules.  
                The paradigm of Conway's Game has captivated the interest of enthusiasts who enjoyt the simplicity and the logical puzzle it presents.
                Some have figured out unique patterns that will traverse the grid in interesting ways.
                <a href = "https://en.wikipedia.org/wiki/Conway's_Game_of_Life">Read more.</a>
            </p>  
            <p> 
                John Conway's contributions are not limited to the creation of the game of life, yet this seems to be one of the most popular associations with his name.
                He is a renowned mathemetician whose contributions center around the topics of finite groups, knot theory, number theory, combinatorial game theory and coding theory.  
                Born in 1937 in England, he earned his BA, MA, and PhD from Cambridge University. He is currently Professor Emeritus of Mathematics at Princeton University. 
                <a href = "https://en.wikipedia.org/wiki/John_Horton_Conway">Read more</a>. 
            </p>  
        </div>
      );
    }
  }

  export default About;