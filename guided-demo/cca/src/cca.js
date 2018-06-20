/**
 * Implemention of a CCA
 */

const MODULO = 11;

/**
 * Make a 2D array helper function
 */
function Array2D(width, height) {
  //NOTE:  Iterate through Array2D row first then column
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

    this.cells = [Array2D(width, height), Array2D(width, height)];

    this.currentBufferIndex = 0;

    this.randomize();

    this.clear();
  }

  /**
   * Return the current active buffer
   *
   * This should NOT be modified by the caller
   */
  getCells() {
    return this.cells[this.currentBufferIndex];
  }

  /**
   * Clear the cca grid
   */
  clear() {}

  /**
   * Randomize the cca grid
   */
  randomize() {
    for (let height = 0; height < this.height; height++) {
      for (let width = 0; width < this.width; width++) {
        this.cells[this.currentBufferIndex][height][width] =
          (Math.random() * MODULO) | 0;
      }
    }
  }

  /**
   * Run the simulation for a single step
   */
  step() {
    const currentIndex = this.currentBufferIndex;
    const nextIndex = this.currentBufferIndex === 0 ? 1 : 0;

    const currentBuffer = this.cells[this.currentBufferIndex];
    const backBuffer = this.cells[this.currentBufferIndex === 0 ? 1 : 0];

    // console.log('current', currentBuffer);
    // console.log('back', backBuffer);

    function hasInfectionsNeighbor(height, width) {
      const nextValue = (currentBuffer[height][width] + 1) % MODULO;

      if (width > 0) {
        if (currentBuffer[height][width - 1] === nextValue) {
          return true;
        }
      }
      if (height > 0) {
        if (currentBuffer[height - 1][width] === nextValue) {
          return true;
        }
      }
      if (width < this.width - 1) {
        if (currentBuffer[height][width + 1] === nextValue) {
          return true;
        }
      }
      if (height < this.height - 1) {
        if (currentBuffer[height + 1][width] === nextValue) {
          return true;
        }
      }
    }
    for (let height = 0; height < this.height; height++) {
      for (let width = 0; width < this.width; width++) {
        if (hasInfectionsNeighbor.call(this, height, width)) {
          backBuffer[height][width] =
            (currentBuffer[height][width] + 1) % MODULO;
        } else {
          backBuffer[height][width] = currentBuffer[height][width];
        }
      }
    }
    // console.log(this.currentBufferIndex);

    this.currentBufferIndex = this.currentBufferIndex === 0 ? 1 : 0;
    // console.log(this.currentBufferIndex);
    // hasInfectionsNeighbor(1,1)
  }
}

export default CCA;
