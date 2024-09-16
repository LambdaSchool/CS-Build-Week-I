import React from 'react';

class Info extends React.Component {
  render() {
    return (
      <div className='info'>
        <section className='textbox'>
          <a href='https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life#Rules' rel="noopener noreferrer" target='_blank'>Rules</a>
          <ul>
            <li>Any live cell with fewer than two live neighbors dies, as if by underpopulation.</li>
            <li>Any live cell with two or three live neighbors lives on to the next generation.</li>
            <li>Any live cell with more than three live neighbors dies, as if by overpopulation.</li>
            <li>Any dead cell with exactly three live neighbors becomes a live cell, as if by reproduction.</li>
          </ul>
        </section>
        <section className='textbox'>
          <a href='https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life' rel="noopener noreferrer" target='_blank'>About The Game of Life</a>
            <p>The Game of Life is not your typical computer game, it is a 'cellular automaton',
              and was invented by Cambridge mathematician John Conway.This game
              became widely known when it was mentioned in an article published
               by Scientific American in 1970. It consists of a collection of
               cells which, based on a few mathematical rules, can live, die or
                multiply. Depending on the initial conditions, the cells form
                 various patterns throughout the course of the game. The Game of
               Life is Turing complete as, given enough resources, it can solve
             any algorithm.</p>
        </section>
      </div>
  )}
}

export default Info;
