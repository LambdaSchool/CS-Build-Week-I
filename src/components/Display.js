import React, { Component } from 'react';
import Grid from './Grid';
import PlayButtons from './PlayButtons';
import './components.css';

// const width = 400;
// const height = 400;

class Display extends Component {
    /**
     * Constructor
     */
    constructor() {
        super();

        this.continueAnimation = true;
        this.speed = 100;
        this.rows = 30;
        this.cols = 30;
        this.state = {
            generation: 0,
            grid: Array(this.rows).fill().map(() => Array(this.cols).fill(false))
        }
    }

    /**
     * After the component has mounted
     */
    componentDidMount() {
        // Request initial animation frame
        requestAnimationFrame((timestamp) => { this.onAnimFrame(timestamp); });
        // this.onAnimFrame();
    }

    /**
     * When the component is about to unmount
     */
    componentWillUnmount() {
        // Stop animating
        this.continueAnimation = false;
    }

    /**
     * Called every frame of animation
     */

    onAnimFrame(timestamp) {
        // If desired, request another anim frame for later
        if (this.continueAnimation) {
            requestAnimationFrame((timestamp) => { this.onAnimFrame(timestamp); });
        }

        // TODO animate stuff
    }

    handleClick = (row, col) => {
        let grid = arrayClone(this.state.grid);
        grid[row][col] = !grid[row][col];
        this.setState({ grid })
    }
    handlePlay = () => {
        clearInterval(this.interval)
        this.interval = setInterval(this.start, this.speed);
        this.start();
    }
    start = () => { // 
        let g = this.state.grid;
        let g2 = arrayClone(this.state.grid);
        for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.cols; j++) {
                let neighbors = 0;
                if (i > 0) if (g[i - 1][j]) neighbors++;
                if (i > 0 && j > 0) if (g[i - 1][j - 1]) neighbors++;
                if (i > 0 && j < this.cols - 1) if (g[i - 1][j + 1]) neighbors++;
                if (j < this.cols - 1) if (g[i][j + 1]) neighbors++;
                if (j > 0) if (g[i][j - 1]) neighbors++;
                if (i < this.rows - 1) if (g[i + 1][j]) neighbors++;
                if (i < this.rows - 1 && j > 0) if (g[i + 1][j - 1]) neighbors++;
                if (i < this.rows - 1 && j < this.cols - 1) if (g[i + 1][j + 1]) neighbors++;
                if (g[i][j] && (neighbors < 2 || neighbors > 3)) g2[i][j] = false;
                if (!g[i][j] && neighbors === 3) g2[i][j] = true;
            }
        }
        this.setState({
            grid: g2,
            generation: this.state.generation + 1
        });
    }
    handlePause = () => {
        clearInterval(this.interval);
    }
    handleStop = () => {
        this.setState({
            grid: Array(this.rows).fill().map(() => Array(this.cols).fill(false)),
            generation: 0
        })
    }
    /**
     * Render the canvas
     */
    render() {
        return (
            <div>
                {/* <canvas ref="canvas" width={width} height={height} /> */}
                <Grid
                    grid={this.state.grid}
                    rows={this.rows}
                    cols={this.cols}
                    handleClick={this.handleClick}
                />
                <PlayButtons
                    handlePlay={this.handlePlay}
                    handlePause={this.handlePause}
                    handleStop={this.handleStop}
                />
                <h4>Generations: {this.state.generation}</h4>
            </div>
        );
    }
}

function arrayClone(arr) {
    return JSON.parse(JSON.stringify(arr));
}

export default Display;