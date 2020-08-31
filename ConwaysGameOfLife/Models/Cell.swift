//
//  cell.swift
//  ConwaysGameOfLife
//
//  Created by denis cedeno on 8/24/20.
//  Copyright © 2020 denisco. All rights reserved.
//

import Foundation

class Cell {
    let x: Int
    let y: Int
    var cellState: CellState
    
    init(x: Int, y: Int, cellState: CellState) {
        self.x = x
        self.y = y
        self.cellState = cellState
    }
    
    public func isNeighbor(to cell: Cell) -> Bool {
        
        let xDelta = abs(self.x - cell.x)
        let yDelta = abs(self.y - cell.y)
        
        switch (xDelta, yDelta) {
        case (1, 1), (0, 1), (1, 0):
            return true
        default:
            return false
        }
    }
}
