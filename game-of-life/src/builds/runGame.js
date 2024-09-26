import trueNeighbors from './findNumTrue'
const runGame = (gameStatus, setGameStatus, size) => {
    const boardStatus = gameStatus.boardStatus
    const clonedBoardStatus = JSON.parse(JSON.stringify(boardStatus))
    let changed = false
    const nextStep = () => {
      for(let i = 0; i < size; i ++) {
        for (let j = 0; j < size; j++) {
          const totalTrueN = trueNeighbors(boardStatus, i, j)
          if (boardStatus[i][j].status) {
            if (totalTrueN < 2 || totalTrueN > 3) {
              clonedBoardStatus[i][j] = {...clonedBoardStatus[i][j], status: false, aliveCount: 0};
              changed = true
            } else {
              clonedBoardStatus[i][j] = {...clonedBoardStatus[i][j], aliveCount: clonedBoardStatus[i][j].aliveCount + 1};
            }

          } else {
            if (totalTrueN === 3) {
              clonedBoardStatus[i][j] = {...clonedBoardStatus[i][j], status: true, aliveCount: 1};
              changed = true
            }
          }
        }
      }
      return clonedBoardStatus
    }
    const newbie = nextStep()
    if (changed === false){
      setGameStatus({...gameStatus, isGameRunning: false})
    } else {

      setGameStatus({...gameStatus, boardStatus: newbie, 
      generation: gameStatus.generation + 1})
    }
    
  }

  export default runGame
