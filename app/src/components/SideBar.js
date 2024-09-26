import React from "react"
import styled from "styled-components"

export default function PresetBoard(props) {

    return (
        <PresetBoardWrapper>
            <button onClick={() =>
                props.playGame()
            }>
                Play
            </button>
            <button onClick={() => props.clearBoard()}>
                Clear the Board
            </button>
            <button onClick={() =>
                props.stopGame()
            }>
                Stop
            </button>
            <button onClick={() => props.randomBoard()}>
                Random Preset
            </button>

            <button onClick={() => {
                props.stopGame()
                props.boardResize(15)
            }}>
                15 X 15
            </button>
            <button onClick={() => {
                props.stopGame()
                props.boardResize(25)
            }}>
                25 X 25
            </button>

        </PresetBoardWrapper>
    )

}

const PresetBoardWrapper = styled.div`
    display:flex;
    flex-direction: column;
    button{
        margin:2rem;
        border: 1px solid grey;
        padding: 5px 20px;
        background-color: white;
        border-radius: 5px;
        font-size: 0.9rem;
        color: rgb(71, 71, 71);
        font-family: 'VT323';
        :hover{
            background-color: grey;
            cursor:pointer;
        }
    }
    
`