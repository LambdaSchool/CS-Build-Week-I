import React, { Component } from 'react';
import Cells from './Cells';

class Grid extends Component {
    // constructor(props){
    //     super(props);
    state = { 
        // alive:"",
        // dead:"",
        grid: [...Array(20)].map(e => Array(20).fill(0))
     }
    // }

     componentDidMount(){
        const canvas = this.refs.canvas;
        const ctx = canvas.getContext('2d');
        ctx.canvas.width = 200;
        ctx.canvas.height = 200;
        for (let x=0;x<=200;x+=20) {
            for (let y=0;y<=200;y+=20) {
                ctx.moveTo(x, 0);
                ctx.lineTo(x, 200);
                ctx.stroke();
                ctx.moveTo(0, y);
                ctx.lineTo(200, y);
                ctx.stroke();
            }
        }
     }

     componentDidMount(){
         const canvas = this.refs.canvas;
         const ctx = canvas.getContext('2d');
         ctx.canvas.width = 200;
         ctx.canvas.height = 200;
         const boxSize = 40;
         const boxes = Math.floor(200/boxSize);
        //  canvas.addEventListener('click', handleClick);
        //  canvas.addEventListener('mousemove', handleClick);

         function drawBox(){
             ctx.beginPath();
             ctx.fillStyle = "white";
             ctx.lineWidth = 3;
             ctx.strokeStyle = 'black';
             for (let row = 0; row < boxes; row++){
                for (let column = 0; column < boxes; column++){
                    let x = column * boxSize;
                    let y = row * boxSize;
                    ctx.rect(x, y, boxSize, boxSize);
                    ctx.fill();
                    ctx.stroke();
                }
             }
             ctx.closePath();
         }
         drawBox();
        }

    //      function handleClick(e){
    //          console.log(ctx.fillStyle);
    //         // ctx.fillStyle = "white" ? "black" : "white";
    //         ctx.fillStyle = "alive" ? "black" : "white";
    //         // if (ctx.fillStyle = 'white') {
    //         //     ctx.fillStyle = 'black';
    //         //  } else {
    //         //     ctx.fillStyle = 'white';
    //         //  }

    //         ctx.fillRect(Math.floor(e.offsetX / boxSize)* boxSize,
    //         Math.floor(e.offsetY / boxSize) * boxSize,
    //         boxSize, boxSize);
    //      }
    //      drawBox();
    //  }

    fillIn = e => {
        let canvas = this.refs.canvas;
        let context = canvas.getContext("2d");
        let boxSize = 40;
        let fix = canvas.getBoundingClientRect();
        let offX = Math.floor((e.clientX - fix.x) / boxSize);
        let offY = Math.floor((e.clientY - fix.y) / boxSize);
         if (this.state.grid[offY][offX] === 0) {
          this.state.grid[offY][offX] = 1;
          context.fillStyle = "black";
          context.fillRect(offX * boxSize, offY * boxSize, boxSize, boxSize);
        } else if (this.state.grid[offY][offX] === 1) {
          this.state.grid[offY][offX] = 0;
          context.fillStyle = "white";
          context.fillRect(offX * boxSize, offY * boxSize, boxSize, boxSize);
          context.strokeRect(offX * boxSize, offY * boxSize, boxSize, boxSize);
        }
         console.log("offX is:", offX);
        console.log("offy is:", offY);
        //arr[y][x]
      };

    render() { 
        return ( 
            <div>
            <canvas class="canvas" ref="canvas" onClick={this.fillIn} />
            </div>
         );
    }
}
 
export default Grid;