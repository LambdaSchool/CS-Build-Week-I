import React from "react";
import styled from "styled-components";
import { CustomHR } from "../globals/global-styles";
import Cell from "./Cell";

const GenerationText = styled.h2`
  font-weight: 700;
  color: #000;
  font-size: 1.6rem;
`;

const CellGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(20, 1fr);
  grid-template-rows: repeat(20, 1fr);
  grid-gap: 0;
`;

const ControlButton = styled.button`
  padding: 0.8rem 1.6rem;
  margin: 1.2rem 1.6rem 0 0;
  background: white;
  min-height: 3.8rem;
  border: 1px solid #eee;
  font-size: 1.2rem;
  font-weight: 700;
  outline: none;
  border-radius: 4rem;
  &:focus {
    background: #05f;
    color: white;
  }
`;

const ControlSelect = styled.select`
  background: white;
  border: 1px solid #eee;
  height: 3.8rem;
  font-size: 1.2rem;
  font-weight: 700;
  width: 12rem;
  outline: none;
  margin: 1.2rem 1.6rem 0 0;
`;

class Canvas extends React.Component {
  state = {
    cells: 400,
    gridArr: [],
    isClickable: true,
    generation: 0,
    paused: false,
    preset: "none"
  };

  componentDidMount() {
    let gridArr = [];
    for (let i = 0; i < this.state.cells; i++) {
      gridArr.push({ id: i, isLiving: false });
    }
    this.setState({ gridArr });
  }

  toggleCellLife = id => {
    if (this.state.isClickable) {
      this.setState(prevState => {
        return {
          gridArr: prevState.gridArr.map(cell =>
            cell.id === id ? (cell.isLiving = !cell.isLiving && cell) : cell
          )
        };
      });
    }
  };

  handleChange = event => {
    const { name, value, type, checked } = event.target;
    type === "checkbox"
      ? this.setState({ [name]: checked })
      : this.setState({ [name]: value });
  };
  handleStartGame = () => {
    this.setState({
      isClickable: false,
      generation: this.state.generation,
      paused: false
    });
    this.generationCounter = setInterval(
      () =>
        this.setState({
          generation: this.state.generation + 1
        }),
      1000
    );
  };

  // Todo
  handlePauseGame = () => {};

  handleResetGame = () => {
    this.setState({
      gridArr: this.state.gridArr.map(cell =>
        cell.isLiving ? !cell.isLiving : cell
      ),
      isClickable: true,
      generation: 0
    });
    clearInterval(this.generationCounter);
  };

  render() {
    return (
      <>
        <GenerationText>🌀 Generation: {this.state.generation}</GenerationText>
        <CustomHR />
        <CellGrid>
          {this.state.gridArr.map((cell, index) => (
            <Cell
              key={index}
              id={cell.id}
              isLiving={cell.isLiving}
              toggleCellLife={this.toggleCellLife}
            />
          ))}
        </CellGrid>
        <CustomHR />
        <ControlButton onClick={this.handleStartGame}>▶️ Play</ControlButton>
        <ControlButton onClick={this.handlePauseGame}>⏸ Pause</ControlButton>
        <ControlButton onClick={this.handleResetGame}>🔄 Reset</ControlButton>
        <ControlSelect
          value={this.state.preset}
          onChange={this.handleChange}
          name="preset"
        >
          <option value="none">Preset: None</option>
          <option value="glider">Preset: Glider</option>
          <option value="random">Preset: Random</option>
          <option value="blinker">Preset: Blinker</option>
        </ControlSelect>
      </>
    );
  }
}

export default Canvas;
