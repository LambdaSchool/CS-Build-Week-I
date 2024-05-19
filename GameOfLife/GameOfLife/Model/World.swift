//
//  World.swift
//  GameOfLife
//
//  Created by Chad Rutherford on 5/27/20.
//  Copyright © 2020 Chad Rutherford. All rights reserved.
//

import Foundation

class World {
	
	// --- --- --- --- --- --- --- --- --- --- --- --- --- --- ---
	// MARK: - Properties
	var cells = [Cell]()
	let size: Int
	var generation = 0 {
		didSet {
			NotificationCenter.default.post(name: .generationChanged, object: self, userInfo: nil)
		}
	}
	
	// --- --- --- --- --- --- --- --- --- --- --- --- --- --- ---
	// MARK: - Computed Properties
	
	
	lazy var cellNeighbors = { (cell: Cell) -> [Cell] in
		let neighboringCells = { (left: Cell, right: Cell) -> Bool in
			let diff = (abs(left.x - right.x), abs(left.y - right.y))
			switch diff {
			case (1, 1), (1, 0), (0, 1):
				return true
			default:
				return false
			}
		}
		return self.cells.filter { neighboringCells(cell, $0) }
	}
	
	init(size: Int) {
		self.size = size
		createRandom()
	}
	
	func updateCells() {
		var updatedCells = [Cell]()
		let livingCells = cells.filter { $0.state == .alive }
		
		for cell in cells {
			let aliveNeighbors = livingCells.filter { $0.isNeighbor(to: cell) }
			switch aliveNeighbors.count {
			case 2...3 where cell.state == .alive:
				updatedCells.append(cell)
			case 3 where cell.state == .dead:
				let aliveCell = Cell(x: cell.x, y: cell.y, state: .alive)
				updatedCells.append(aliveCell)
			default:
				let dyingCell = Cell(x: cell.x, y: cell.y, state: .dead)
				updatedCells.append(dyingCell)
			}
		}
		
		cells = updatedCells
		generation += 1
	}
	
	func createRandom() {
		generation = 0
		cells = []
		for x in 0 ..< (size / 6) {
			for y in 0 ..< (size / 6) {
				let randomState = Int.random(in: 0...2)
				let cell = Cell(x: x, y: y, state: randomState == 0 ? .alive : .dead)
				cells.append(cell)
			}
		}
	}
	
	func createBlinker() {
		generation = 0
		cells = []
		let center = ((size / 6) / 2) - 2
		for x in 0 ..< (size / 6) {
			for y in 0 ..< (size / 6) {
				switch (x, y) {
				case (center, center):
					let centerCell = Cell(x: center, y: center, state: .alive)
					cells.append(centerCell)
				case (center - 1, center):
					let leftCell = Cell(x: center - 1, y: center, state: .alive)
					cells.append(leftCell)
				case (center + 1, center):
					let rightCell = Cell(x: center + 1, y: center, state: .alive)
					cells.append(rightCell)
				default:
					let cell = Cell(x: x, y: y, state: .dead)
					cells.append(cell)
				}
			}
		}
	}
	
	func createToad() {
		generation = 0
		cells = []
		let center = ((size / 6) / 2) - 2
		for x in 0 ..< (size / 6) {
			for y in 0 ..< (size / 6) {
				switch (x, y) {
				case (center, center):
					let centerCell = Cell(x: center, y: center, state: .alive)
					cells.append(centerCell)
				case (center - 1, center):
					let leftCell = Cell(x: center - 1, y: center, state: .alive)
					cells.append(leftCell)
				case (center + 1, center):
					let rightCell = Cell(x: center + 1, y: center, state: .alive)
					cells.append(rightCell)
				case (center, center - 1):
					let topLeftCell = Cell(x: center, y: center - 1, state: .alive)
					cells.append(topLeftCell)
				case (center + 1, center - 1):
					let topMiddleCell = Cell(x: center + 1, y: center - 1, state: .alive)
					cells.append(topMiddleCell)
				case (center + 2, center - 1):
					let topRightCell = Cell(x: center + 2, y: center - 1, state: .alive)
					cells.append(topRightCell)
				default:
					let cell = Cell(x: x, y: y, state: .dead)
					cells.append(cell)
				}
			}
		}
	}
	
	func createPulsar() {
		generation = 0
		cells = []
		let center = ((size / 6) / 2) - 2
		for x in 0 ..< (size / 6) {
			for y in 0 ..< (size / 6) {
				switch (x, y) {
				case (center - 1, center - 2), (center - 1, center - 3), (center - 1, center - 4):
					let cell1 = Cell(x: center - 1, y: center - 2, state: .alive)
					let cell2 = Cell(x: center - 1, y: center - 3, state: .alive)
					let cell3 = Cell(x: center - 1, y: center - 4, state: .alive)
					cells.append(cell1)
					cells.append(cell2)
					cells.append(cell3)
				case (center - 2, center - 6), (center - 3, center - 6), (center - 4, center - 6):
					let cell1 = Cell(x: center - 2, y: center - 6, state: .alive)
					let cell2 = Cell(x: center - 3, y: center - 6, state: .alive)
					let cell3 = Cell(x: center - 4, y: center - 6, state: .alive)
					cells.append(cell1)
					cells.append(cell2)
					cells.append(cell3)
				case (center - 2, center - 1), (center - 3, center - 1), (center - 4, center - 1):
					let cell1 = Cell(x: center - 2, y: center - 1, state: .alive)
					let cell2 = Cell(x: center - 3, y: center - 1, state: .alive)
					let cell3 = Cell(x: center - 4, y: center - 1, state: .alive)
					cells.append(cell1)
					cells.append(cell2)
					cells.append(cell3)
				case (center - 6, center - 2), (center - 6, center - 3), (center - 6, center - 4):
					let cell1 = Cell(x: center - 6, y: center - 2, state: .alive)
					let cell2 = Cell(x: center - 6, y: center - 3, state: .alive)
					let cell3 = Cell(x: center - 6, y: center - 4, state: .alive)
					cells.append(cell1)
					cells.append(cell2)
					cells.append(cell3)
				case (center + 1, center - 2), (center + 1, center - 3), (center + 1, center - 4):
					let cell1 = Cell(x: center + 1, y: center - 2, state: .alive)
					let cell2 = Cell(x: center + 1, y: center - 3, state: .alive)
					let cell3 = Cell(x: center + 1, y: center - 4, state: .alive)
					cells.append(cell1)
					cells.append(cell2)
					cells.append(cell3)
				case (center + 2, center - 1), (center + 3, center - 1), (center + 4, center - 1):
					let cell1 = Cell(x: center + 2, y: center - 1, state: .alive)
					let cell2 = Cell(x: center + 3, y: center - 1, state: .alive)
					let cell3 = Cell(x: center + 4, y: center - 1, state: .alive)
					cells.append(cell1)
					cells.append(cell2)
					cells.append(cell3)
				case (center + 6, center - 2), (center + 6, center - 3), (center + 6, center - 4):
					let cell1 = Cell(x: center + 6, y: center - 2, state: .alive)
					let cell2 = Cell(x: center + 6, y: center - 3, state: .alive)
					let cell3 = Cell(x: center + 6, y: center - 4, state: .alive)
					cells.append(cell1)
					cells.append(cell2)
					cells.append(cell3)
				case (center + 2, center - 6), (center + 3, center - 6), (center + 4, center - 6):
					let cell1 = Cell(x: center + 2, y: center - 6, state: .alive)
					let cell2 = Cell(x: center + 3, y: center - 6, state: .alive)
					let cell3 = Cell(x: center + 4, y: center - 6, state: .alive)
					cells.append(cell1)
					cells.append(cell2)
					cells.append(cell3)
				case (center - 2, center + 1), (center - 3, center + 1), (center - 4, center + 1):
					let cell1 = Cell(x: center - 2, y: center + 1, state: .alive)
					let cell2 = Cell(x: center - 3, y: center + 1, state: .alive)
					let cell3 = Cell(x: center - 4, y: center + 1, state: .alive)
					cells.append(cell1)
					cells.append(cell2)
					cells.append(cell3)
				case (center - 1, center + 2), (center - 1, center + 3), (center - 1, center + 4):
					let cell1 = Cell(x: center - 1, y: center + 2, state: .alive)
					let cell2 = Cell(x: center - 1, y: center + 3, state: .alive)
					let cell3 = Cell(x: center - 1, y: center + 4, state: .alive)
					cells.append(cell1)
					cells.append(cell2)
					cells.append(cell3)
				case (center + 2, center + 1), (center + 3, center + 1), (center + 4, center + 1):
					let cell1 = Cell(x: center + 2, y: center + 1, state: .alive)
					let cell2 = Cell(x: center + 3, y: center + 1, state: .alive)
					let cell3 = Cell(x: center + 4, y: center + 1, state: .alive)
					cells.append(cell1)
					cells.append(cell2)
					cells.append(cell3)
				case (center + 1, center + 2), (center + 1, center + 3), (center + 1, center + 4):
					let cell1 = Cell(x: center + 1, y: center + 2, state: .alive)
					let cell2 = Cell(x: center + 1, y: center + 3, state: .alive)
					let cell3 = Cell(x: center + 1, y: center + 4, state: .alive)
					cells.append(cell1)
					cells.append(cell2)
					cells.append(cell3)
				case (center + 2, center + 6), (center + 3, center + 6), (center + 4, center + 6):
					let cell1 = Cell(x: center + 2, y: center + 6, state: .alive)
					let cell2 = Cell(x: center + 3, y: center + 6, state: .alive)
					let cell3 = Cell(x: center + 4, y: center + 6, state: .alive)
					cells.append(cell1)
					cells.append(cell2)
					cells.append(cell3)
				case (center + 6, center + 2), (center + 6, center + 3), (center + 6, center + 4):
					let cell1 = Cell(x: center + 6, y: center + 2, state: .alive)
					let cell2 = Cell(x: center + 6, y: center + 3, state: .alive)
					let cell3 = Cell(x: center + 6, y: center + 4, state: .alive)
					cells.append(cell1)
					cells.append(cell2)
					cells.append(cell3)
				case (center - 2, center + 6), (center - 3, center + 6), (center - 4, center + 6):
					let cell1 = Cell(x: center - 2, y: center + 6, state: .alive)
					let cell2 = Cell(x: center - 3, y: center + 6, state: .alive)
					let cell3 = Cell(x: center - 4, y: center + 6, state: .alive)
					cells.append(cell1)
					cells.append(cell2)
					cells.append(cell3)
				case (center - 6, center + 2), (center - 6, center + 3), (center - 6, center + 4):
					let cell1 = Cell(x: center - 6, y: center + 2, state: .alive)
					let cell2 = Cell(x: center - 6, y: center + 3, state: .alive)
					let cell3 = Cell(x: center - 6, y: center + 4, state: .alive)
					cells.append(cell1)
					cells.append(cell2)
					cells.append(cell3)
				default:
					let cell = Cell(x: x, y: y, state: .dead)
					cells.append(cell)
				}
			}
		}
	}
	
	func createGlider() {
		generation = 0
		cells = []
		let center = ((size / 6) / 2) - 2
		for x in 0 ..< (size / 6) {
			for y in 0 ..< (size / 6) {
				switch (x, y) {
				case (center, center):
					let centerCell = Cell(x: center, y: center, state: .alive)
					cells.append(centerCell)
				case (center - 1, center):
					let leftCell = Cell(x: center - 1, y: center, state: .alive)
					cells.append(leftCell)
				case (center - 2, center - 1):
					let spacedCell = Cell(x: center - 2, y: center - 1, state: .alive)
					cells.append(spacedCell)
				case (center, center - 1):
					let midCell = Cell(x: center, y: center - 1, state: .alive)
					cells.append(midCell)
				case (center, center - 2):
					let topCell = Cell(x: center, y: center - 2, state: .alive)
					cells.append(topCell)
				default:
					let cell = Cell(x: x, y: y, state: .dead)
					cells.append(cell)
				}
			}
		}
	}
}
