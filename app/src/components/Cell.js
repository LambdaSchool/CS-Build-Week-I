import React from 'react'
import styled from 'styled-components'

export default function Cell(props) {
    const { isAlive } = props.data
    return (
        <CellWrapper
            isAlive={isAlive}
            onClick={(e) => {
                props.toggleAliveState(props.data)
            }}
        >

        </CellWrapper>

    )
}

const CellWrapper = styled.button`
height: 20px;
width: 20px;
border: 0.1px gray solid;
text-align: center;
background: ${(props) => (props.isAlive ? 'red' : 'white')};
`