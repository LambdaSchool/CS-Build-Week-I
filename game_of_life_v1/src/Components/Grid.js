import React, { Component } from 'react';
import Cell from './Cell';


const Grid = props => {
    return (
        <div>
            {props.cellStates.map(gridRow => {
                gridRow.map(cell => {
                    return (
                        <Cell />
                    )
                })
            })}
        </div>
    )
}




// class Grid extends Component {
//     constructor() {
//         super();
//         this.state = {
//             gameIsRunning: false,
//             generationNumber: 0,
//             gridHeight: 10,
//             gridWidth: 10,
//             cellStates: [],
//         }
//     } 
    

//     generateGrid = (e, gridHeight, gridWidth) => {


//         // for (let i = 0; i < gridHeight; i++) {
//         //     for (let j = 0; j < gridWidth; j++) {
//         //         return (
//         //             <Cell 
//         //                 rowPosition = {i}
//         //                 columnPosition = {j}
//         //             />
//         //         )
//         //     }
//         // }
//     }


//     render() {
//         return (
//           <div>
//             <h1>GRID</h1>


//           </div>
//         );
//       }
// }





// class GameBoard extends Component {
//     constructor() {
//         super();
//         this.state = {
//             game_is_running: false,
//             generationNumber: 0,
//             board: [
//                 [0, 0, 0, 0, 0],
//                 [0, 0, 0, 0, 0], 
//                 [0, 0, 0, 0, 0],
//                 [0, 0, 0, 0, 1], 
//                 [0, 0, 0, 0, 0]
//                 ],
//         }
//     }

//     get_cell_position = () => {
//         const board_length = this.state.board.length;
//         // console.log("board length: ", board_length);
//         for (let i = 0; i < board_length; i++) {
//             for (let j = 0; j < board_length; j++) {
//                 // this.count_live_neighbors(i,j);
//                 console.log("Cell position: ", [j,i], "Live neighbor count :", this.count_live_neighbors(i,j));
//             }
//         }
//     }

//     count_live_neighbors = (j,i) => {
//         // (j,i) = (row_position, column_position)
//         let live_neighbor_count = 0;

//         const board = this.state.board;

//         let top_left_neighbor = 0; 
//         let top_center_neighbor = 0;

//         // top-left neighbor
//         if (j-1 === -1 || i-1 === -1) {
//             top_left_neighbor = 0;
//         }
//         else {
//             top_left_neighbor = board[j-1][i-1];
//         }
        

//         // top-center neighbor
//         if (j-1 === -1 || i-1 === -1) {
//             top_center_neighbor = 0;
//         }
//         else {
//             top_center_neighbor = board[j-1][i];
//         }

//         // top-right neighbor
//         const top_right_neighbor = board[j-1][i+1];

//         // center-right neighbor
//         const center_right_neighbor = board[j][i+1];

//         // bottom-right neighbor
//         const bottom_right_neighbor = board[j+1][i+1];

//         // bottom-center neighbor 
//         const bottom_center_neighbor = board[j+1][i];

//         // bottom-left neighbor
//         const bottom_left_neighbor = board[j+1][i-1];

//         // center-left neighbor
//         const center_left_neighbor = board[j][i-1];

//         let neighbor_life_status = [top_left_neighbor,top_center_neighbor, top_right_neighbor, center_right_neighbor, bottom_right_neighbor, bottom_center_neighbor, bottom_left_neighbor, center_left_neighbor];

//         for (let i = 0; i < neighbor_life_status.length; i++) {
//             live_neighbor_count += neighbor_life_status[i];
//         }

//         console.log(live_neighbor_count);
//         return live_neighbor_count;
//     }

//     // count_live_neighbors = () => {
//     //     let board_position = [];
//     //     const board_length = this.state.board.length;
//     //     for (let i = 0; i < board_length; i++) {
//     //         for (let j = 0; j < board_length; j++) {
//     //             console.log((i,j));
//     //         }
//     //     }
//     // }


//   render() {
//     return (
//       <div>
//         Game of Life - v1
//         <button onClick={(e) => this.get_cell_position()}>
//             Get cell position
//         </button>
//       </div>
//     );
//   }
// }

export default Grid;