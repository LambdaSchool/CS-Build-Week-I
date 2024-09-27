import React, { Component } from "react";
import "./App.css";
import Grid from "./components/grid";
import Particles from "react-particles-js";

class App extends Component {
  constructor() {
    super();
    this.state = { };
  }

  render() {
    return (
      <div className="App">
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            zIndex: -1
          }}
        >
          <Particles
            params={{
              particles: {
                number: {
                  value: 200,
                  density: {
                    enable: false
                  }
                },
                color: {
                  value: "#32cd32"
                },            
                size: {
                  value: 10,
                  random: true,
                  anim: {
                    speed: 4,
                    size_min: 0.3
                  }
                },
                line_linked: {
                  enable: false
                },
                move: {
                  random: true,
                  speed: 1,
                  direction: "top",
                  out_mode: "out"
                }
              },
              interactivity: {
                events: {
                  onhover: {
                    enable: true,
                    mode: "bubble"
                  },
                  onclick: {
                    enable: true,
                    mode: "repulse"
                  }
                },
                modes: {
                  bubble: {
                    distance: 250,
                    duration: 2,
                    size: 0,
                    opacity: 0
                  },
                  repulse: {
                    distance: 400,
                    duration: 4
                  }
                }
              }
            }}
          />
        </div>
        <Grid/>        
      </div>
    );
  }
}

export default App;
