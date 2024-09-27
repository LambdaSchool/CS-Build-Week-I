import styled from 'react-emotion';


// Main Container Styling
const Main = styled('div')`
    max-width: 100%;
    width: 800px;
    height: 500px;
    margin: 0 auto;
`

// Controls Component Styling
const ControlsWrapper = styled('div')`
    display: flex;
    justify-content: center;
    margin-top: 20px;
    width: 800px;
    height: 50px;
`

// Styling for creating cells
const Cells = styled('div')`
    display: flex;
    padding: 10px;
    margin: 0 auto;
    border: 1px solid black;
`

// Styling for Grid Container
const GridContainer = styled('div')`
    display: flex;
    flex-direction: column;
    align-content: center;
    margin: 0 auto;
`

// Grid Styling
const GridStyle = styled('div')`
    display: flex;
    justify-content: center;
    padding: 0 0px;
`

// Label Styling for rows and columns
const LabelStyling = styled('div')`
    display: flex;
    justify-content: space-evenly;
    margin-bottom: 20px;
`
// Dead
const CellDead = styled('div')`
    display: flex;
    padding: 10px;
    margin: 1px;
    border: 1px solid black;
`

// Alive
const CellAlive = styled('div')`
    display: flex;
    padding: 10px;
    margin: 1px;
    border: 1px solid black;
    background-color: black;
`

export {ControlsWrapper, Cells, CellAlive, CellDead, Main, GridContainer, GridStyle, LabelStyling};