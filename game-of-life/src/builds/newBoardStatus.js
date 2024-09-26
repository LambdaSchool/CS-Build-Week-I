const size = 25
const newBoardStatus = (cellStatus = ()=> {
    const cell = {
      status : Math.random() < 0.2,
      aliveCount: 0
    }
    if (cell.status){cell.aliveCount = 1}
    return cell
  }) => {
    const grid = []
    for (let i = 0; i < size; i ++) {
      grid[i] = []
      for(let j = 0; j < size; j++) {
        grid[i][j] = cellStatus()
      }
    }
    return grid
  };

  export default newBoardStatus