/**
 * Implementation of a CCA
 */

const MODULO = 8;

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
    clear() {
        for (let y = 0; y < this.height; y++) {
            this.cells[this.currentBufferIndex][y].fill(0);
        }
    }

    /**
     * Randomize the cca grid
     */
    randomize() {
        for (let height = 0; height < this.height; height++) {
            for (let width = 0; width < this.width; width++) {
                this.cells[this.currentBufferIndex][height][width] = (Math.random() * MODULO) | 0;
            }
        }
    }

    /**
     * Run the simulation for a single step
     */
    step() {
        let currentBuffer = this.cells[this.currentBufferIndex];
        let backBuffer = this.cells[this.currentBufferIndex === 0 ? 1 : 0];

        // check neighbors to see if they are infected if so change their color
        function hasInfectedNeighbor(height, width) {
            const nextValue = (currentBuffer[height][width] - 1) % MODULO;

            // west
            if (width > 0) {
                if (currentBuffer[height][width - 1] === nextValue) {
                    return true;
                }
            }

            // north
            if (height > 0) {
                if (currentBuffer[height - 1][width] === nextValue) {
                    return true;
                }
            }

            // east
            if (width < this.width - 1) {
                if (currentBuffer[height][width + 1] === nextValue) {
                    return true;
                }
            }

            // south
            if (height < this.height - 1) {
                if (currentBuffer[height + 1][width]) {
                    return true;
                }
            }
        }

        for (let h = 0; h < this.height; h++) {
            for (let w = 0; w < this.width; w++) {
                if (hasInfectedNeighbor.call(this, h, w)) {
                    backBuffer[h][w] = (currentBuffer[h][w] + 1) % MODULO;
                } else {
                    backBuffer[h][w] = currentBuffer[h][w];
                }
            }
        }

        this.currentBufferIndex = this.currentBufferIndex === 0 ? 1 : 0;
    }
}

export default CCA;
