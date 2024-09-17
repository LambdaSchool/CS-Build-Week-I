import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import Display from './Display';
import './components.css';

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {
        return (
            <Container className='containerWrapper'>
                <Row>
                    <Col><h2>Conway's Game of Life</h2></Col>
                </Row>
                <Row className='displayFlex'>
                    <Col xs="6" className='centerContent'><h3>Generation: #</h3></Col>
                    <Col xs="6" className='centerContent'><h3>Rules</h3></Col>
                </Row>
                <Row className='displayFlex'>
                    <Col xs="3">
                        <Display /></Col>
                    <Col xs="2" className='dirColumn'>
                        <button className='presetBut'>Preset 1</button>
                        <button className='presetBut'>Preset 2</button>
                        <button className='presetBut'>Preset 3</button>
                        <button className='presetBut'>Preset 4</button>
                    </Col>
                    <Col xs="7" className="rulesArea">
                        <ul>
                            <li>If the cell is alive and has 2 or 3 neighbors, then it remains alive. Else it dies.</li>
                            <li>If the cell is dead and has exactly 3 neighbors, then it comes to life. Else if remains dead.</li>
                        </ul>
                    </Col>
                </Row>
                <Row>
                    <Col xs="3" className='thirtyPer displayFlex'>
                        {/* <button className='playB'>Play</button>
                        <button className='playB'>Pause</button>
                        <button className='playB'>Stop</button> */}
                    </Col>
                    <Col xs="9"></Col>
                </Row>
                <Row>
                    <Col><h3>About this Algorithm:</h3></Col>
                </Row>
                <Row>
                    <Col><quote>The Game of Life, also known simply as Life, is a cellular automaton devised by the British mathematician John Horton Conway in 1970.

The game is a zero-player game, meaning that its evolution is determined by its initial state, requiring no further input. One interacts with the Game of Life by creating an initial configuration and observing how it evolves, or, for advanced players, by creating patterns with particular properties.</quote>
                        <p><a target="_blank" rel="noopener noreferrer" href="https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life" className='wikilink'>wikipedia</a></p></Col>
                </Row>

            </Container>
        );
    }
}

export default Home;