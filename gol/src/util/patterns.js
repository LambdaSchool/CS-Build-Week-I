function blinker(size) {
  const matrix = new Array(size).fill(0).map(() => new Array(size).fill(0));
  const middle = Math.floor(size / 2);
  matrix[middle][middle] = 1;
  matrix[middle][middle - 1] = 1;
  matrix[middle][middle + 1] = 1;
  return matrix;
}

function glider(size) {
  const matrix = new Array(size).fill(0).map(() => new Array(size).fill(0));
  matrix[0][0] = 1;
  matrix[0][2] = 1;
  matrix[1][1] = 1;
  matrix[1][2] = 1;
  matrix[2][1] = 1;
  return matrix;
}

function randomBoard(size) {
  const matrix = new Array(size).fill(0).map(() => new Array(size).fill(0));
  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[0].length; j++) {
      if (Math.random() >= 0.67) {
        matrix[i][j] = 1;
      }
    }
  }
  return matrix;
}

export { blinker, glider, randomBoard };
