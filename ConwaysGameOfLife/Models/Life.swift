//
//  Life.swift
//  ConwaysGameOfLife
//
//  Created by denis cedeno on 8/25/20.
//  Copyright © 2020 denisco. All rights reserved.
//

import Foundation

class Life {
    var cells: [Cell]
    let gridSize: Int = 48
    
    
    init() {
        cells = [Cell]()
        for xLoc in 0..<self.gridSize {
            for yLoc in 0..<self.gridSize {
                cells.append(Cell(x: xLoc, y: yLoc, cellState: CellState.randomState()))
            }
        }
    }
    
    func updateCells() {
        var updatedCells = [Cell]()
        let liveCells = cells.filter { $0.cellState == .Living }
        
        for cell in cells {
            let livingNeighbors = liveCells.filter { $0.isNeighbor(to: cell) }
            
            switch livingNeighbors.count {
            case 2...3 where cell.cellState == .Living:
                updatedCells.append(cell)
            case 3 where cell.cellState == .Dead:
                let liveCell = Cell(x: cell.x, y: cell.y, cellState: .Living)
                updatedCells.append(liveCell)
            default:
                let deadCell = Cell(x: cell.x, y: cell.y, cellState: .Dead)
                updatedCells.append(deadCell)
            }
        }
        
        cells = updatedCells
    }
}



