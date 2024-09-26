import React from 'react';
import styled from 'styled-components'
import Row from './Row'



export default function Board(props) {
    return (
        <BoardWrapper>
            {props.currentBoard.map((arr, idx) => {
                return (
                    <Row
                        key={`${idx}`}
                        arr={arr}
                        toggleAliveState={props.toggleAliveState}
                    />
                )
            })}
        </BoardWrapper>

    )
}


const BoardWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

`;

