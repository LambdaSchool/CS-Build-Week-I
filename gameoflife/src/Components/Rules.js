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

const ModalContainer = Styled.div`
    width: 60%;
    height: 200px;
    border: 1px solid black;
    background: #FFFFFF;
    margin: 150px auto;
    display: flex;
    justify-content: center;
    padding: 15px;
    position: relative;
    left: 100px;
`;

const Modal = Styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: left;
    width: 80%;
    margin: 0;
`;

const Button = Styled.button`
  height: 30px;
  width: 100px;
`;

const Rules = props => {
    return (
        <Background>
            <TransBackground>
            </TransBackground>
            <ModalContainer>
                <Modal>
                    <h3>Rules</h3>
                    <ul>
                        <li>Any live cell with fewer than two live neighbors dies, as if by underpopulation.</li>
                        <li>Any live cell with two or three live neighbors lives on to the next generation.</li>
                        <li>Any live cell with more than three live neighbors dies, as if by overpopulation.</li>
                        <li>Any dead cell with exactly three live neighbors becomes a live cell, as if by reproduction.</li>
                    </ul>
                </Modal>
            </ModalContainer>
        </Background>
    )
}

export default Rules;