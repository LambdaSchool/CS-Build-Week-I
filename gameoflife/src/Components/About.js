import React from 'react';
import Styled from 'styled-components';


const Background = Styled.div`
width: 100vw;
height: 100vh;
display: flex;
justify-content: center;
position: fixed;
top: 0;
left: 0;
overlay: hidden;
`;

const TransBackground = Styled.div`
    background-color: #99ff33;
    opacity: .5;
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    overlay: hidden;
`;

const AboutContainer = Styled.div`
    width: 60%;
    height: 600px;
    border: 1px solid black;
    background: #FFFFFF;
    margin: 150px auto;
    display: flex;
    justify-content: center;
    padding: 10px;
    position: relative;
    left: 100px;
`;

const Modal = Styled.div`
    display: flex;
    flex-direction: column;
    text-align: left;
    justify-content: center;
    width: 80%;
`;

const Button = Styled.button`
  height: 30px;
  width: 100px;
`;

const About = props => {
    return (
        <Background>
            <TransBackground>
            </TransBackground>
                <AboutContainer>
                    <Modal>
                        <h3>About Conway's Game of Life:</h3>
                        <p>From Wikipedia: In late 1940, John von Neumann defined life as a creation (as a being or organism) which can reproduce itself and simulate a Turing machine. Von Neumann was thinking about an engineering solution which would use electromagnetic components floating randomly in liquid or gas.[2] This turned out not to be realistic with the technology available at the time. Thus, ingeniously, Stanisław Ulam invented cellular automata, which were intended to simulate von Neumann's theoretical electromagnetic constructions. Ulam discussed using computers to simulate his cellular automata in a two-dimensional lattice in several papers. In parallel, Von Neumann attempted to construct Ulam's cellular automaton. Although successful, he was busy with other projects and left some details unfinished. His construction was complicated because it tried to simulate his own engineering design. Over time, simpler life constructions were provided by other researchers, and published in papers and books.</p>
                        <p>Motivated by questions in mathematical logic and in part by work on simulation games by Ulam, among others, John Conway began doing experiments in 1968 with a variety of different 2D cellular automaton rules.[3] Conway's initial goal was to define an interesting and unpredictable cell automaton. Thus, he wanted some configurations to last for a long time before dying, other configurations to go on forever without allowing cycles, etc. It was a significant challenge and an open problem for years before experts on cell automatons managed to prove that, indeed, Conway's Game of Life admitted of a configuration which was alive in the sense of satisfying Von Neumann's two general requirements. While the definitions before Conway's Life were proof-oriented, Conway's construction aimed at simplicity without a priori providing proof the automaton was alive.</p>
                    </Modal>
                </AboutContainer>
        </Background>
    )
}

export default About;