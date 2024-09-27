// import { useCallback, useRef } from 'react';

// const surround = [
//     [0, 1],
//     [0, -1],
//     [1, 0],
//     [1, 1],
//     [1, -1],
//     [-1, 0],
//     [-1, 1],
//     [-1, -1]
// ];

// const runningRef = useRef();
// runningRef.current = start

// const Populate = useCallback(() => {
//     if (!runningRef.current) {
//         return;
//     }

//     setGrid((g) => {
//         return produce(g, gridCopy => {
//             for (let i = 0; i < Rows; i++) {
//                 // checking for neighbors
//                 for (let j = 0; j < Col; j++) {
//                     let neighbors = 0;
//                     surround.forEach(([x, y]) => {
//                         const genI = i + x;
//                         const genJ = j + y;
//                         // making sure we are in the grid and not out of it
//                         if (genI >= 0 && genI < Rows && genJ >= 0 && genJ < Col) {
//                              neighbors += g[genI][genJ]
//                         }
//                     })

//                     // determines if a cell dies or is born depending on above condition
//                     if (neighbors < 2 || neighbors > 3) {
//                         gridCopy[i][j] = 0;
//                     } else if (g[i][j] === 0 && neighbors === 3) {
//                         gridCopy[i][j] = 1;
//                     }                        
                      
//                 }
//             }
//         })
//     })

//     setInterval(Populate, interval)
//     // setTimeout(Populate, interval);
// }, []);

// export default Populate;