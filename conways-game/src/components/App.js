import React, { Fragment, Component } from "react";
import { createGlobalStyle } from "styled-components";
import Canvas from "./LifeCanvas/Canvas";
import ControlsMenu from "../components/ControlsMenu/ControlsContainer";
import HeaderPanel from "../components/PresetSection/HeaderPanel";
import CarouselPanel from "../components/PresetSection/CarouselPanel";
import { colors } from "../utils/variables";
import NavigationContainer from "./NavigationMenu/NavigationContainer";

const GlobalStyle = createGlobalStyle`
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }
    html, body {
        height: 100%;
    }
    html {
        font-family: sans-serif;
        font-size: 62.5%;
        color: ${colors.white};
    }
    body {
        font-size: 1.6rem;
    }
    input[type="search"]::-webkit-search-decoration,
    input[type="search"]::-webkit-search-cancel-button,
    input[type="search"]::-webkit-search-results-button,
    input[type="search"]::-webkit-search-results-decoration {
        display: none;
    }
`;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      menuActive: false,
      playActive: false
    };
  }
  componentDidMount() {
    this.setState({
      menuActive: false,
      playActive: false
    });
  }
  toggleState = stateName => {
    const boolState = this.state[stateName];
    if (typeof boolState === "boolean") {
      this.setState({ [stateName]: !boolState });
    } else {
      console.error("toggleState: works only with a state name that has a boolean type");
    }
  };

  render() {
    const { menuActive, playActive } = this.state;
    return (
      <Fragment>
        <GlobalStyle />
        <Canvas playActive={playActive} />
        <ControlsMenu 
        toggleState={this.toggleState}
        playActive = {playActive}
         />
        <HeaderPanel />
        <CarouselPanel />
        <NavigationContainer
          toggleState={this.toggleState}
          menuActive={menuActive}
        />
      </Fragment>
    );
  }
}

export default App;
