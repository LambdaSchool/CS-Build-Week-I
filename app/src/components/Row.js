import React from 'react';
import styled from 'styled-components';
import Cell from './Cell'

export default function Row(props) {
    return (
        <RowWrapper>
            {
                props.arr.map((cell, idx) => {
                    return <Cell key={`${idx}`} data={cell} toggleAliveState={props.toggleAliveState} />
                })
            }
        </RowWrapper>

    )
}

const RowWrapper = styled.div`
    display: flex;
`;