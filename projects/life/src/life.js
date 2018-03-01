/**
 * Implementation of Conway's game of Life
 */

const MODULO = 2;

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
		this.width = width;
		this.height = height;

		this.currentBufferIndex = 0;
		this.buffer = [Array2D(width, height), Array2D(width, height)];

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
	 * Clear the life grid
	 */
	clear() {
		for (let y = 0; y < this.height; y++) {
			this.buffer[this.currentBufferIndex][y].fill(0);
		}
	}

	/**
	 * Randomize the life grid
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
		let backBufferIndex = this.currentBufferIndex === 0 ? 1 : 0;
		let currentBuffer = this.buffer[this.currentBufferIndex];
		let backBuffer = this.buffer[backBufferIndex];

		// See if we have neighbor to infect this one
		function hasInfectiousNeighbor(x, y) {
			const nextValue = (currentBuffer[y][x] + 1) % MODULO;

			let counter = 0;

			// check West neighbor of cell x, y
			if (x > 0) {
				if (currentBuffer[y][x - 1] === nextValue) {
					counter++;
				}
			}
			// East neighbors
			if (x < this.width - 1) {
				if (currentBuffer[y][x + 1] === nextValue) {
					counter++;
				}
			}
			// North neighbors
			if (y > 0) {
				if (currentBuffer[y - 1][x] === nextValue) {
					counter++;
				}
			}
			// South neighbors
			if (y < this.height - 1) {
				if (currentBuffer[y + 1][x] === nextValue) {
					counter++;
				}
			}
			// Check to see if cell is dead or not

			// fewer than 2 = dead
			if (counter < 2) return true;
			// 2 or 3 = lives on
			if (counter === 2 || counter === 3) return false;
			// more than 3 = dead
			if (counter > 3) return true;
			// dead cell neighbors = 3 then live on
			// if (backBuffer[y][x] === 0 && counter === 3) return false;
			console.log(counter);
		}

		// Loop through and decide the state of the next generation (alive or dead in Game of Life)
		// for each cell processed
		for (let y = 0; y < this.height; y++) {
			for (let x = 0; x < this.width; x++) {
				if (hasInfectiousNeighbor.call(this, x, y)) {
					backBuffer[y][x] = 0;
				} else {
					backBuffer[y][x] = 1;
				}
			}
		}
		this.currentBufferIndex = this.currentBufferIndex === 0 ? 1 : 0;
	}
}

export default Life;
