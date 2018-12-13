import React from 'react';
import { Container, Opacity, ModalBody } from './ModalStyles';


class Modal extends React.Component {  
  render() {
    return (
      <Container>
        <Opacity onClick={() => this.props.handleModal()} />
        <ModalBody>
          <button className="last" onClick={() => this.props.handleModal()}>
            X
          </button>
          <h1>Welcome to the Game of life</h1>
          <main>
            <section>
              <h2>What the game is about</h2>
              <p>Conway's Game of Life is a game invented by mathematician John Conway in 1970</p>
            </section>
            <section>
              <h2>Rules for the game</h2>
              <p>The rules are as follows:</p>
              <p>Each cell lives in a square in a rectangular grid. A cell can either be dead or alive (alive cells are coloured blue in our demo). Before you start the game, you need to provide an initial state. You can do this in the above example by clicking on squares, or by picking a preset from the dropdown menu.</p>
              <p>The game is now ready to begin, and this involves advancing through time one step at a time. A cell's fate depends on the state of its 8 closest neighbours (our grid utilises wrapping, meaning a cell on the far left is thought of as a neighbour of a cell on the far right, and the same principle applies at the top and bottom).</p>
              <ul>
                <li>If a cell is alive, and 2 or 3 of it's neighbours are also alive, the cell remains alive.</li>
                <li>If a cell is alive and it has more than 3 alive neighbours, it dies of overcrowding.</li>
                <li>If a cell is alive and it has fewer than 2 alive neighbours, it dies of loneliness.</li>
                <li>If a cell is dead and it has exactly 3 neighbours it becomes alive again.</li>
              </ul>
              <p>Those 4 seemingly simple rules can result in wildy differing sequences. Sometimes an initial state will create an unpredictable, chaotic sequence. Other times, it will create a repeating sequence (such as the glider, pulsar, and spaceship from the preset dropdown). And other times, all cells will quickly die off or stabilise into a static formation, known as a still life, such as a 2x2 square.</p>
            </section>
          </main>
        </ModalBody>
      </Container>
    );
  }
};

export default Modal;

