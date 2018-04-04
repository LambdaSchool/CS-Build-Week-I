/**
 * Implementation of Conway's game of Life
 */

/**
 * Make a 2D array helper function
 */
function Array2D(width, height) {
  let a = new Array(height);

  for (let i = 0; i < height; i++) {
    a[i] = new Array(width);
  }

  return a;
}

/**
 * Life class
 */
class Life {

  /**
   * Constructor
   */
  constructor(width, height) {
    // !!!! IMPLEMENT ME !!!!
    this.width = width;
    this.height = height;

    this.currentBuffer = 0;
    this.buffer = [
      Array2D(width, height),
      Array2D(width, height),
    ];

    this.clear();
  }

  /**
   * Return the current active buffer
   * 
   * This should NOT be modified by the caller
   */
  getCells() {
    // !!!! IMPLEMENT ME !!!!
    return this.buffer[this.currentBufferIndex];
  }

  /**
   * Clear the life grid
   */
  clear() {
    // !!!! IMPLEMENT ME !!!!
    for (let y = 0; y < this.height; y++) {
      this.buffer[this.currentBufferIndex][y].fill(0);
    }
  }

  /**
   * Randomize the life grid
   */
  randomize() {
    // !!!! IMPLEMENT ME !!!!
    let buffer = this.buffer[this.currentBufferIndex];

    for (let y = 0; y < this.height; y++) {
      for (let x = 0; x < this.width; x++) {
        buffer[y][x] = Math.floor(Math.random() * MODULO);
      }
    }
  }

  /**
   * Run the simulation for a single step
   */
  step() {
    // !!!! IMPLEMENT ME !!!!
    let backBufferIndex = this.currentBufferIndex === 0 ? 1 : 0;
    let currentBuffer = this.buffer[this.currentBufferIndex];
    let backBuffer = this.buffer[backBufferIndex];

    const hasInfectiousNeighbor = (x, y) => {
      const nextValue = (currentBuffer[y][x] + 1) % MODULO;
      let count = 0;

      // west
      if (x > 0) { // as long as it's not the first cell in the row
        if (currentBuffer[y][x - 1] === nextValue) {
          return true;
          count++;
        }
      }

      // north west 
      if (x > 0 && y > 0) {
        if (currentBuffer[y - 1][x - 1] === nextValue) {
          return true;
          count++;
        }
      }

      // north
      if (y > 0) { // if not very top row
        if (currentBuffer[y - 1][x] === nextValue) {
          count++;
        }
      }

      // north east
      if (y > 0 && x < this.width - 1) {
        if (currentBuffer[y - 1][x + 1] === nextValue) {
          return true;
          count++;
        }
      }

      // east
      if (x < this.width - 1) {
        if (currentBuffer[y][x + 1] === nextValue) {
          count++;
        }
      }

      // south east
      if (x < this.width - 1 && y < this.height - 1) {
        if (currentBuffer[y + 1][x + 1] === nextValue) {
          count++;
        }
      }

      // south
      if (y < this.height - 1) {
        if (currentBuffer[y + 1][x] === nextValue) {
          count++;
        }
      }

      // south west
      if (x > 0 && y < this.height - 1) {
        if (currentBuffer[y + 1][x - 1] === nextValue) {
          count++;
        }
      }

      return count;
    }

    for (let y = 0; y < this.height; y++) {
      for (let x = 0; x < this.width; x++) {
        if (count === 2 || count === 3) {
          backBuffer[y][x] = (currentBuffer[y][x] + 1) % MODULO;

        } else
        // if alive, count is 2 or 3, then remain alive
        // else dies
        // if dead, and has 2 neighbors, then come back to life
        // else stay dead
      }
    }
    this.currentBufferIndex = backBufferIndex;
  }

}

export default Life;
