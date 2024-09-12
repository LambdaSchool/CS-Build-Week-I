import React, { Component } from 'react';
import './App.css';

function Array2D(width, height) {
    let array = new Array(height);

    for (let i = 0; i < height; i++) {
        array[i] = new Array(width);
    }

    return array;
}

class Life {
    
    constructor(width, height) {
        this.width = width;
        this.height = height;

        this.cells = [Array2D(width, height), Array2D(width, height)];
        this.currentIndex = 0;
        this.clear();
    }

    fetchCells() {
        return this.cells[this.currentIndex];
    }

    getRandomCells() {
        for (let height = 0; height < this.height; height++) {
            for (let width = 0; width < this.width; width++) {
                this.cells[this.currentIndex][height][width] =
                    (Math.random() * 5) | 0;
            }
        }
    }

    clear() {
        for (let height = 0; height < this.height; height++) {
            this.cells[this.currentIndex][height].fill(0);
        }
    }

    move() {
        let frontBuffer = this.cells[this.currentIndex];
        let backBuffer = this.cells[this.currentIndex === 0 ? 1 : 0];

        function checkNeighbor(height, width) {
            let neighbor = 0;

            // west
            if (width > 0) {
                if (frontBuffer[height][width - 1] === 1) {
                    neighbor++;
                }
            }
            //east
            if (width < this.width - 1) {
                if (frontBuffer[height][width + 1] === 1) {
                    neighbor++;
                }
            }
            //north
            if (height > 0) {
                if (frontBuffer[height - 1][width] === 1) {
                    neighbor++;
                }
            }
            //south
            if (height < this.height - 1) {
                if (frontBuffer[height + 1][width] === 1) {
                    neighbor++;
                }
            }
            //north-west
            if (height > 0 && width > 0) {
                if (frontBuffer[height - 1][width - 1] === 1) {
                    neighbor++;
                }
            }

            //north-east
            if (height > 0 && width < this.width - 1) {
                if (frontBuffer[height - 1][width + 1] === 1) {
                    neighbor++;
                }
            }
            //south-east
            if (height < this.height - 1 && width < this.width - 1) {
                if (frontBuffer[height + 1][width + 1] === 1) {
                    neighbor++;
                }
            }
            //south-west
            if (height < this.height - 1 && width > 0) {
                if (frontBuffer[height + 1][width - 1] === 1) {
                    neighbor++;
                }
            }
            return neighbor;
        }

        for (let height = 0; height < this.height; height++) {
            for (let width = 0; width < this.width; width++) {
                let neighbor = checkNeighbor.call(this, height, width);

                if (frontBuffer[height][width] === 1) {
                    if (neighbor < 2 || neighbor > 3) {
                        backBuffer[height][width] = 0;
                    } else {
                        backBuffer[height][width] = 1;
                    }
                } else {
                    if (neighbor === 3) {
                        backBuffer[height][width] = 1;
                    } else {
                        backBuffer[height][width] = 0;
                    }
                }
            }
        }

        this.currentIndex = this.currentIndex === 0 ? 1 : 0;
    }

}

export default Life;
