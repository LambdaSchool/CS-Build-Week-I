function gameOfLife(board) {
  // code is refactored from my previous python code
  // will clean up by creating subfunctions and improve readability later
  const newBoard = board.slice(0);
  const m = newBoard.length;
  const n = newBoard[0].length;

  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      let count = 0;
      let startX = Math.max(0, i - 1);
      let endX = Math.min(i + 2, m);
      let startY = Math.max(0, j - 1);
      let endY = Math.min(j + 2, n);
      for (let k = startX; k < endX; k++) {
        for (let l = startY; l < endY; l++) {
          if (
            !(k === i && j === l) &&
            (newBoard[k][l] === 1 || newBoard[k][l] === 2)
          ) {
            count += 1;
          }
        }
      }
      if (newBoard[i][j] === 0) {
        if (count === 3) {
          newBoard[i][j] = 3;
        }
      } else {
        if (count < 2 || count > 3) {
          newBoard[i][j] = 2;
        }
      }
    }
  }
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      newBoard[i][j] %= 2;
    }
  }
  return newBoard;
}

export default gameOfLife;
