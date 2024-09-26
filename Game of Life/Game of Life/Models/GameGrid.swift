//
//  GameGrid.swift
//  Game of Life
//
//  Created by Mark Gerrior on 6/25/20.
//  Copyright © 2020 Mark Gerrior. All rights reserved.
//

import UIKit

public enum Patterns {
    case random

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

protocol GameStatsDelegate {
    func showGeneration()
    func showPopulation()
    func gridUpdated()
}

class GameGrid: NSObject {
    let size: Int
    var cells: [Cell] = []
    var delegate: GameStatsDelegate?

    var generation = 0
    var population: Int {
        cells.filter{ $0.state == .alive }.count
    }

    public init(gridSize: Int) {
        self.size = gridSize

        // Create grid ttt
        for y in 0..<size {
            for x in 0..<size {
                let cell = Cell(x: x, y: y)
                cells.append(cell)
            }
        }

        super.init()

        self.useExamplePattern(pattern: .random)
    }

    private func randomizeGrid() {
        for cell in cells {
            let randomState = Int.random(in: 0...5)
            cell.state = randomState == 0 ? .alive : .dead
        }
    }

    func clearGrid() {
        for cell in cells {
            cell.state = .dead
        }
        generation = 0

        notifyDelegate()
    }

    public func useExamplePattern(pattern: Patterns = .glider) {
        print(pattern)

        clearGrid()

        switch pattern {
        case .random:
            randomizeGrid()

        case .behive:
            cellAt(x: 3, y: 2).state = .alive
            cellAt(x: 4, y: 2).state = .alive

            cellAt(x: 2, y: 3).state = .alive
            cellAt(x: 5, y: 3).state = .alive

            cellAt(x: 3, y: 4).state = .alive
            cellAt(x: 4, y: 4).state = .alive

        case .blinker:
            cellAt(x: 3, y: 2).state = .alive
            cellAt(x: 4, y: 2).state = .alive
            cellAt(x: 5, y: 2).state = .alive

        case .toad:
            cellAt(x: 4, y: 3).state = .alive
            cellAt(x: 5, y: 3).state = .alive
            cellAt(x: 6, y: 3).state = .alive

            cellAt(x: 3, y: 4).state = .alive
            cellAt(x: 4, y: 4).state = .alive
            cellAt(x: 5, y: 4).state = .alive

        case .beacon:
            cellAt(x: 2, y: 2).state = .alive
            cellAt(x: 3, y: 2).state = .alive
            cellAt(x: 2, y: 3).state = .alive

            cellAt(x: 5, y: 4).state = .alive
            cellAt(x: 4, y: 5).state = .alive
            cellAt(x: 5, y: 5).state = .alive

        case .pulsar:
            // Row 1
            cellAt(x: 6, y: 2).state = .alive
            cellAt(x: 6, y: 3).state = .alive
            cellAt(x: 6, y: 4).state = .alive
            cellAt(x: 7, y: 4).state = .alive

            cellAt(x: 12, y: 2).state = .alive
            cellAt(x: 12, y: 3).state = .alive
            cellAt(x: 12, y: 4).state = .alive
            cellAt(x: 11, y: 4).state = .alive

            // Row 2
            cellAt(x: 2, y: 6).state = .alive
            cellAt(x: 3, y: 6).state = .alive
            cellAt(x: 4, y: 6).state = .alive
            cellAt(x: 4, y: 7).state = .alive

            cellAt(x: 7, y: 6).state = .alive
            cellAt(x: 8, y: 6).state = .alive
            cellAt(x: 8, y: 7).state = .alive
            cellAt(x: 6, y: 7).state = .alive
            cellAt(x: 6, y: 8).state = .alive
            cellAt(x: 7, y: 8).state = .alive

            cellAt(x: 10, y: 6).state = .alive
            cellAt(x: 11, y: 6).state = .alive
            cellAt(x: 10, y: 7).state = .alive
            cellAt(x: 12, y: 7).state = .alive
            cellAt(x: 11, y: 8).state = .alive
            cellAt(x: 12, y: 8).state = .alive

            cellAt(x: 14, y: 6).state = .alive
            cellAt(x: 15, y: 6).state = .alive
            cellAt(x: 16, y: 6).state = .alive
            cellAt(x: 14, y: 7).state = .alive

            // Row 3
            cellAt(x: 2, y: 12).state = .alive
            cellAt(x: 3, y: 12).state = .alive
            cellAt(x: 4, y: 12).state = .alive
            cellAt(x: 4, y: 11).state = .alive

            cellAt(x: 6, y: 10).state = .alive
            cellAt(x: 7, y: 10).state = .alive
            cellAt(x: 6, y: 11).state = .alive
            cellAt(x: 8, y: 11).state = .alive
            cellAt(x: 7, y: 12).state = .alive
            cellAt(x: 8, y: 12).state = .alive

            cellAt(x: 11, y: 10).state = .alive
            cellAt(x: 12, y: 10).state = .alive
            cellAt(x: 12, y: 11).state = .alive
            cellAt(x: 10, y: 11).state = .alive
            cellAt(x: 10, y: 12).state = .alive
            cellAt(x: 11, y: 12).state = .alive

            cellAt(x: 14, y: 11).state = .alive
            cellAt(x: 14, y: 12).state = .alive
            cellAt(x: 15, y: 12).state = .alive
            cellAt(x: 16, y: 12).state = .alive

            // Row 4
            cellAt(x: 6, y: 14).state = .alive
            cellAt(x: 6, y: 15).state = .alive
            cellAt(x: 6, y: 16).state = .alive
            cellAt(x: 7, y: 14).state = .alive

            cellAt(x: 12, y: 14).state = .alive
            cellAt(x: 12, y: 15).state = .alive
            cellAt(x: 12, y: 16).state = .alive
            cellAt(x: 11, y: 14).state = .alive

        case .pentadecathlon:
            // Object 1
            cellAt(x: 5, y: 4).state = .alive
            cellAt(x: 6, y: 4).state = .alive
            cellAt(x: 7, y: 4).state = .alive
            cellAt(x: 6, y: 5).state = .alive
            cellAt(x: 6, y: 6).state = .alive
            cellAt(x: 5, y: 7).state = .alive
            cellAt(x: 6, y: 7).state = .alive
            cellAt(x: 7, y: 7).state = .alive

            // Object 2
            cellAt(x: 5, y: 9).state = .alive
            cellAt(x: 6, y: 9).state = .alive
            cellAt(x: 7, y: 9).state = .alive
            cellAt(x: 5, y: 10).state = .alive
            cellAt(x: 6, y: 10).state = .alive
            cellAt(x: 7, y: 10).state = .alive

            // Object 3
            cellAt(x: 5, y: 12).state = .alive
            cellAt(x: 6, y: 12).state = .alive
            cellAt(x: 7, y: 12).state = .alive
            cellAt(x: 6, y: 13).state = .alive
            cellAt(x: 6, y: 14).state = .alive
            cellAt(x: 5, y: 15).state = .alive
            cellAt(x: 6, y: 15).state = .alive
            cellAt(x: 7, y: 15).state = .alive

        case .glider:
            cellAt(x: 3, y: 2).state = .alive
            cellAt(x: 4, y: 3).state = .alive
            cellAt(x: 4, y: 4).state = .alive
            cellAt(x: 3, y: 4).state = .alive
            cellAt(x: 2, y: 4).state = .alive
        }

        generation = 0

        notifyDelegate()
    }

    func cellAt(x: Int, y: Int) -> Cell {
        var absolutePosition: Int
        // 3, 2 on 25 x 25 grid
        absolutePosition = (y * size) + x
        return cells[absolutePosition]
    }

    func cellCoordinates(index: Int) -> (x: Int, y: Int) {
        var y = 0
        var x = 0

        y = index / size
        x = index - (y * size)

        return (x, y)
    }

    func cellTapped(at index: Int) {
        if cells[index].state == .alive {
            cells[index].state = .dead
        } else {
            cells[index].state = .alive
        }
        notifyDelegate()
    }

    func performGameTurn() {
        var index = 0
        var cellsToKill: [Cell] = []
        var cellsToBirth: [Cell] = []

        for cell in cells {
            var count = 0
            let coordinates = cellCoordinates(index: index)

            // West
            if coordinates.x != 0 {
                if cellAt(x: coordinates.x - 1, y: coordinates.y).state == .alive {
                    count = count + 1
                }
            }

            // North West
            if coordinates.x != 0 && coordinates.y != 0 {
                if cellAt(x: coordinates.x - 1, y: coordinates.y - 1).state == .alive {
                    count = count + 1
                }
            }

            // North
            if coordinates.y != 0 {
                if cellAt(x: coordinates.x, y: coordinates.y - 1).state == .alive {
                    count = count + 1
                }
            }

            // North East
            if coordinates.x < (size - 1) && coordinates.y != 0 {
                if cellAt(x: coordinates.x + 1, y: coordinates.y - 1).state == .alive {
                    count = count + 1
                }
            }

            // East
            if coordinates.x < (size - 1) {
                if cellAt(x: coordinates.x + 1, y: coordinates.y).state == .alive {
                    count = count + 1
                }
            }

            // South East
            if coordinates.x < (size - 1) && coordinates.y < (size - 1) {
                if cellAt(x: coordinates.x + 1, y: coordinates.y + 1).state == .alive {
                    count = count + 1
                }
            }

            // South
            if coordinates.y < (size - 1) {
                if cellAt(x: coordinates.x, y: coordinates.y + 1).state == .alive {
                    count = count + 1
                }
            }

            // South West
            if coordinates.x != 0 && coordinates.y < (size - 1) {
                if cellAt(x: coordinates.x - 1, y: coordinates.y + 1).state == .alive {
                    count = count + 1
                }
            }

            if cell.state == .alive {
                if count < 2 || count > 3 {
                    cellsToKill.append(cell)
                }
            } else { // cell.state == .dead
                if count == 3 {
                    cellsToBirth.append(cell)
                }
            }
            index = index + 1
        }

        for cell in cellsToKill {
            cell.state = .dead
        }

        for cell in cellsToBirth {
            cell.state = .alive
        }

        generation += 1
        notifyDelegate()
    }

    private func notifyDelegate() {
        delegate?.showGeneration()
        delegate?.showPopulation()
        delegate?.gridUpdated()
    }
}
