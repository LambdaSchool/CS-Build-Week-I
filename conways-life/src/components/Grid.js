import React, {Component} from 'react';
import './grid.css'

export default class Grid extends Component {
    constructor(props) {
        super(props);
        this.state = {
            width: 400,
            height: 400,
            generation: 0,
            inProgress: false,
            looping: '',
            speed: 500,
        };
    }

    beacon = () => {
        const canvas = this.refs.canvas;
        const ctx = canvas.getContext('2d');
        this.setState({
            // let xVal = (x / 20);                      // X Value 
            // let yVal = (y / 20);                      // Y Value
            // let cell = `${xVal}, ${yVal}`,
            '7, 6': 'black',
            '7, 7': 'black',
            '8, 6': 'black',
            '8, 7': 'black',
            '9, 8': 'black',
            '9, 9': 'black',
            '10, 8': 'black',
            '10, 9': 'black',
        })
        ctx.fillStyle = 'black';
        ctx.fillRect(7*20, 6*20, 19, 19);
        ctx.fillRect(7*20, 7*20, 19, 19);
        ctx.fillRect(8*20, 6*20, 19, 19);
        ctx.fillRect(8*20, 7*20, 19, 19);
        ctx.fillRect(9*20, 8*20, 19, 19);
        ctx.fillRect(9*20, 9*20, 19, 19);
        ctx.fillRect(10*20, 8*20, 19, 19);
        ctx.fillRect(10*20, 9*20, 19, 19);
    }

    cellsState = () => {
        for(let x = 0; x <= 400; x+=20){
            for(let y = 0; y<= 400; y+=20){
                this.setState({
                    [`${x/20}, ${y/20}`]: 'white'
                })
            }
        }
    }

    clearGrid = (e) => {
        const canvas = this.refs.canvas;
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        this.gridInit();
        this.cellsState();
        this.setState({generation: 0});
        // this.setState({inProgress: false});
        this.pause();
    }

    componentDidMount() {
        const canvas = this.refs.canvas;
        // const ctx = canvas.getContext('2d');
        this.gridInit();
        canvas.addEventListener('click', this.handleClick);
        this.cellsState();
    }

    gridInit = () => {
        const canvas = this.refs.canvas;
        const ctx = canvas.getContext('2d');
        ctx.canvas.width = this.state.width;
        ctx.canvas.height = this.state.height;
        for(let x = 0; x <= 400; x+=20){
            for(let y = 0; y<= 400; y+=20){
                ctx.moveTo(x, 0);
                ctx.lineTo(x, 400);
                ctx.stroke();
                ctx.moveTo(0, y);
                ctx.lineTo(400, y);
                ctx.stroke();
            }
        }
    }

    halfSpeed = () => {
        this.setState({speed: 1000});
    }

    handleClick = (e) => {
        if(this.state.inProgress === false) {
            const canvas = this.refs.canvas;
            const ctx = canvas.getContext('2d');
            // let position = canvas.getBoundingClientRect();
            let xcoord = Math.floor(e.offsetX / 20);
            let ycoord = Math.floor(e.offsetY / 20);
            let cell = `${xcoord}, ${ycoord}`;
            // this.setState({[`${cell}`]: 'black'});
            if(this.state[`${cell}`] === 'white') {
                this.setState({[`${cell}`]: 'black'});
            }
            else if(this.state[`${cell}`] === 'black') {
                this.setState({[`${cell}`]: 'white'});
            }
            ctx.fillStyle = this.state[`${cell}`];
            ctx.fillRect(Math.floor(e.offsetX / 20) * 20, Math.floor(e.offsetY / 20) *20, 19, 19);
            console.log(this.state[`${cell}`]);
            console.log(this.state);
        }
    }

    loop = (e) => {
        // this.setState({inProgress: true});
        // if(this.state.inProgress){
            this.setState({looping: setTimeout(() => {
                this.play();
                requestAnimationFrame(this.loop);
            }, this.state.speed)
            })
        // }
        // requestAnimationFrame(this.loop);
    }

    normalSpeed = () => {
        this.setState({speed: 500});
    }

    pause = (e) => {
        this.setState({inProgress: false});
        clearTimeout(this.state.looping);
    }

    play = (e) => {
        const canvas = this.refs.canvas;
        const ctx = canvas.getContext('2d');
        this.setState({inProgress: true});
        // this.setState({generation: this.state.generation + 1});
        let buffer = {...this.state};
        console.log(buffer);
        for(let x = 0; x <= 400; x+=20){
            for(let y = 0; y<= 400; y+=20){
                let livC = 0;                             // Live Cells
                let xVal = (x / 20);                      // X Value 
                let yVal = (y / 20);                      // Y Value
                let cell = `${xVal}, ${yVal}`
                let tlc = `${xVal - 1}, ${yVal - 1}`;     // Top Left Cell
                let tc = `${xVal}, ${yVal - 1}`;          // Top Cell
                let trc = `${xVal + 1}, ${yVal - 1}`;     // Top Right Cell
                let lc = `${xVal - 1}, ${yVal}`;          // Left Cell
                let rc = `${xVal + 1}, ${yVal}`;          // Right Cell
                let blc = `${xVal - 1}, ${yVal + 1}`;     // Bottom Left Cell
                let bc = `${xVal}, ${yVal + 1}`;          // Bottom Cell
                let brc = `${xVal + 1}, ${yVal + 1}`;     // Bottom Right Cell
                if(this.state[tlc] === 'black') {
                    livC++;
                }
                if(this.state[tc] === 'black') {
                    livC++;
                }
                if(this.state[trc] === 'black') {
                    livC++;
                }
                if(this.state[lc] === 'black') {
                    livC++;
                }
                if(this.state[rc] === 'black') {
                    livC++;
                }
                if(this.state[blc] === 'black') {
                    livC++;
                }
                if(this.state[bc] === 'black') {
                    livC++;
                }
                if(this.state[brc] === 'black') {
                    livC++;
                }
                if(this.state[cell] === 'black' && livC < 2) {
                    buffer[cell] = 'white';
                    ctx.fillStyle = buffer[cell];
                    ctx.fillRect(xVal * 20.07, yVal *20, 18.9, 18.9)
                }
                if(this.state[cell] === 'black' && livC > 3) {
                    buffer[cell] = 'white';
                    ctx.fillStyle = buffer[cell];
                    ctx.fillRect(xVal * 20.07, yVal *20, 18.9, 18.9)
                }
                else if(this.state[cell] === 'white' && livC === 3) {
                    buffer[cell] = 'black';
                    ctx.fillStyle = buffer[cell];
                    ctx.fillRect(xVal * 20, yVal * 20, 20, 20)
                }
            }
        }
        this.setState({...buffer, generation: this.state.generation + 1, inProgress: true});
    }

    penta = () => {
        const canvas = this.refs.canvas;
        const ctx = canvas.getContext('2d');
        this.setState({
            // let xVal = (x / 20);                      // X Value 
            // let yVal = (y / 20);                      // Y Value
            // let cell = `${xVal}, ${yVal}`,
            '7, 5': 'black',
            '7, 6': 'black',
            '7, 13': 'black',
            '7, 14': 'black',
            '8, 4': 'black',
            '8, 7': 'black',
            '8, 12': 'black',
            '8, 15': 'black',
            '9, 4': 'black',
            '9, 7': 'black',
            '9, 12': 'black',
            '9, 15': 'black',
            '10, 4': 'black',
            '10, 7': 'black',
            '10, 12': 'black',
            '10, 15': 'black',
            '11, 5': 'black',
            '11, 6': 'black',
            '11, 13': 'black',
            '11, 14': 'black',
        })
        ctx.fillStyle = 'black';
        ctx.fillRect(7*20, 5*20, 19, 19);
        ctx.fillRect(7*20, 6*20, 19, 19);
        ctx.fillRect(7*20, 13*20, 19, 19);
        ctx.fillRect(7*20, 14*20, 19, 19);
        ctx.fillRect(8*20, 4*20, 19, 19);
        ctx.fillRect(8*20, 7*20, 19, 19);
        ctx.fillRect(8*20, 12*20, 19, 19);
        ctx.fillRect(8*20, 15*20, 19, 19);
        ctx.fillRect(9*20, 4*20, 19, 19);
        ctx.fillRect(9*20, 7*20, 19, 19);
        ctx.fillRect(9*20, 12*20, 19, 19);
        ctx.fillRect(9*20, 15*20, 19, 19);
        ctx.fillRect(10*20, 4*20, 19, 19);
        ctx.fillRect(10*20, 7*20, 19, 19);
        ctx.fillRect(10*20, 12*20, 19, 19);
        ctx.fillRect(10*20, 15*20, 19, 19);
        ctx.fillRect(11*20, 5*20, 19, 19);
        ctx.fillRect(11*20, 6*20, 19, 19);
        ctx.fillRect(11*20, 13*20, 19, 19);
        ctx.fillRect(11*20, 14*20, 19, 19);
    }

    pulsar = () => {
        const canvas = this.refs.canvas;
        const ctx = canvas.getContext('2d');
        this.setState({
            // let xVal = (x / 20);                      // X Value 
            // let yVal = (y / 20);                      // Y Value
            // let cell = `${xVal}, ${yVal}`,
            '4, 5': 'black',
            '4, 6': 'black',
            '4, 7': 'black',
            '4, 11': 'black',
            '4, 12': 'black',
            '4, 13': 'black',
            '6, 3': 'black',
            '6, 8': 'black',
            '6, 10': 'black',
            '6, 15': 'black',
            '7, 3': 'black',
            '7, 8': 'black',
            '7, 10': 'black',
            '7, 15': 'black',
            '8, 3': 'black',
            '8, 8': 'black',
            '8, 10': 'black',
            '8, 15': 'black',
            '9, 5': 'black',
            '9, 6': 'black',
            '9, 7': 'black',
            '9, 11': 'black',
            '9, 12': 'black',
            '9, 13': 'black',
            '11, 5': 'black',
            '11, 6': 'black',
            '11, 7': 'black',
            '11, 11': 'black',
            '11, 12': 'black',
            '11, 13': 'black',
            '12, 3': 'black',
            '12, 8': 'black',
            '12, 10': 'black',
            '12, 15': 'black',
            '13, 3': 'black',
            '13, 8': 'black',
            '13, 10': 'black',
            '13, 15': 'black',
            '14, 3': 'black',
            '14, 8': 'black',
            '14, 10': 'black',
            '14, 15': 'black',
            '16, 5': 'black',
            '16, 6': 'black',
            '16, 7': 'black',
            '16, 11': 'black',
            '16, 12': 'black',
            '16, 13': 'black',
        })
        ctx.fillStyle = 'black';
        ctx.fillRect(4*20, 5*20, 19, 19);
        ctx.fillRect(4*20, 6*20, 19, 19);
        ctx.fillRect(4*20, 7*20, 19, 19);
        ctx.fillRect(4*20, 11*20, 19, 19);
        ctx.fillRect(4*20, 12*20, 19, 19);
        ctx.fillRect(4*20, 13*20, 19, 19);
        ctx.fillRect(6*20, 3*20, 19, 19);
        ctx.fillRect(6*20, 8*20, 19, 19);
        ctx.fillRect(6*20, 10*20, 19, 19);
        ctx.fillRect(6*20, 15*20, 19, 19);
        ctx.fillRect(7*20, 3*20, 19, 19);
        ctx.fillRect(7*20, 8*20, 19, 19);
        ctx.fillRect(7*20, 10*20, 19, 19);
        ctx.fillRect(7*20, 15*20, 19, 19);
        ctx.fillRect(8*20, 3*20, 19, 19);
        ctx.fillRect(8*20, 8*20, 19, 19);
        ctx.fillRect(8*20, 10*20, 19, 19);
        ctx.fillRect(8*20, 15*20, 19, 19);
        ctx.fillRect(9*20, 5*20, 19, 19);
        ctx.fillRect(9*20, 6*20, 19, 19);
        ctx.fillRect(9*20, 7*20, 19, 19);
        ctx.fillRect(9*20, 11*20, 19, 19);
        ctx.fillRect(9*20, 12*20, 19, 19);
        ctx.fillRect(9*20, 13*20, 19, 19);
        ctx.fillRect(11*20, 5*20, 19, 19);
        ctx.fillRect(11*20, 6*20, 19, 19);
        ctx.fillRect(11*20, 7*20, 19, 19);
        ctx.fillRect(11*20, 11*20, 19, 19);
        ctx.fillRect(11*20, 12*20, 19, 19);
        ctx.fillRect(11*20, 13*20, 19, 19);
        ctx.fillRect(12*20, 3*20, 19, 19);
        ctx.fillRect(12*20, 8*20, 19, 19);
        ctx.fillRect(12*20, 10*20, 19, 19);
        ctx.fillRect(12*20, 15*20, 19, 19);
        ctx.fillRect(13*20, 3*20, 19, 19);
        ctx.fillRect(13*20, 8*20, 19, 19);
        ctx.fillRect(13*20, 10*20, 19, 19);
        ctx.fillRect(13*20, 15*20, 19, 19);
        ctx.fillRect(14*20, 3*20, 19, 19);
        ctx.fillRect(14*20, 8*20, 19, 19);
        ctx.fillRect(14*20, 10*20, 19, 19);
        ctx.fillRect(14*20, 15*20, 19, 19);
        ctx.fillRect(16*20, 5*20, 19, 19);
        ctx.fillRect(16*20, 6*20, 19, 19);
        ctx.fillRect(16*20, 7*20, 19, 19);
        ctx.fillRect(16*20, 11*20, 19, 19);
        ctx.fillRect(16*20, 12*20, 19, 19);
        ctx.fillRect(16*20, 13*20, 19, 19);
    }

    twiceSpeed = () => {
        this.setState({speed: 250});
    }

    render() {
        return(
            <div className="grid">
                <h1>Generation: {this.state.generation}</h1>
                <canvas className='canvas' ref='canvas' />
                <div>
                    <button onClick={this.play}>Play Once</button>
                    <button onClick={this.loop}>Loop</button>
                    <button onClick={this.pause}>Pause</button>
                    <button onClick={this.clearGrid}>Clear</button>
                    <button onClick={this.halfSpeed}>Half Speed</button>
                    <button onClick={this.normalSpeed}>Normal Speed</button>
                    <button onClick={this.twiceSpeed}>2x Speed</button>
                </div>
                <div>
                    <h1>Sample Presets:</h1>
                    <button onClick={this.beacon}>Beacon</button>
                    <button onClick={this.pulsar}>Pulsar</button>
                    <button onClick={this.penta}>Pentadecathlon</button>
                </div>
            </div>
        );
    }
}