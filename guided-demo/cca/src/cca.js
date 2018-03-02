/**
 * Implemention of a CCA
 */

const MODULO = 8;

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
 * CCA class
 */
class CCA {

  /**
   * Constructor
   */
  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.currentBufferIndex = 0;

    this.buffer = [
      Array2D(width, height),
      Array2D(width, height)
    ];

    this.clear();
  }

  /**
   * Return the current active buffer
   *
   * This should NOT be modified by the caller
   */
  getCells() {
    return this.buffer[this.currentBufferIndex];
  }

  /**
   * Clear the cca grid of the current active buffer
   */
  clear() {
    for (let i = 0; i < this.height; i++) {
      this.buffer[this.currentBufferIndex][i].fill(0);
    }
  }

  /**
   * Randomize the cca grid (values 0-7)
   */
  randomize() {
    for (let y = 0; y < this.height; y++) {
      for (let x = 0; x < this.width; x++) {
        const rand = Math.floor(Math.random() * MODULO);
        this.buffer[this.currentBufferIndex][y][x] = rand;
      }
    }
  }

  /**
   * Run the simulation for a single step
   */
  step() {
    // Fill the offscreen buffer with the next cca generation built
    // from the current buffer.

    let backBufferIndex = this.currentBufferIndex === 0 ? 1 : 0;
    let currentBuffer = this.buffer[this.currentBufferIndex];
    let backBuffer = this.buffer[backBufferIndex];

    // See if we have a neighbor to infect this one
    const hasInfectiousNeighbor = (x, y) =>  {
      const nextValue = (currentBuffer[y][x] + 1) % MODULO;

      // Check the west neighbor of cell x, y
      if (x > 0 && currentBuffer[y][x - 1] === nextValue) {
        return true;
      }

      // North
      if (y > 0 && currentBuffer[y - 1][x] === nextValue) {
        return true;
      }

      // East
      if (x < this.width - 1 && currentBuffer[y][x + 1] === nextValue) {
        return true;
      }

      // South
      if (y < this.height - 1 && currentBuffer[y + 1][x] === nextValue) {
        return true;
      }

      // If we've made it this far we're not infected!
      return false;
    }

    // Loop through and decide the state of the next generation
    // for each cell processed.
    for (let i = 0; i < this.height; i++) {
      for (let j = 0; j < this.width; j++) {
        if (hasInfectiousNeighbor(j, i)) {
          backBuffer[i][j] = (currentBuffer[i][j] + 1) % MODULO;
        } else {
          backBuffer[i][j] = currentBuffer[i][j];
        }
      }
    }

    this.currentBufferIndex = this.currentBufferIndex === 0 ? 1 : 0;
  }
}

export default CCA;
