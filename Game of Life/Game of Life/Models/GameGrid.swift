//
//  GameGrid.swift
//  Game of Life
//
//  Created by Mark Gerrior on 6/25/20.
//  Copyright © 2020 Mark Gerrior. All rights reserved.
//

import UIKit

public enum Examples {
    // Still Lifes
    case behive

    // Oscillators
    case blinker
    case toad
    case beacon
    case pulsar
    case pentadecathlon

    // Spaceships
    case glider
}

class GameGrid: NSObject {
    let size: Int
    var cells: [Cell] = []

    var generation = 0
    var population: Int {
        cells.filter{ $0.state == .alive }.count
    }

    public init(size: Int) {
        self.size = size

        // Create grid
        for x in 0..<size {
            for y in 0..<size {
                let cell = Cell(x: x, y: y)
                cells.append(cell)
            }
        }
    }

    func randomizeGrid() {
        for cell in cells {
            let randomState = Int.random(in: 0...1)
            cell.state = randomState == 0 ? .alive : .dead
        }
    }

    func clearGrid() {
        for cell in cells {
            cell.state = .dead
        }
    }
}
