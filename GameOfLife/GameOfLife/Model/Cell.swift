//
//  Cell.swift
//  GameOfLife
//
//  Created by Chad Rutherford on 5/27/20.
//  Copyright © 2020 Chad Rutherford. All rights reserved.
//

import Foundation

enum State {
	case alive, dead
}

struct Cell: Hashable {
	let x: Int
	let y: Int
	var state: State
	
	init(x: Int, y: Int, state: State) {
		self.x = x
		self.y = y
		self.state = state
	}
	
	func hash(into hasher: inout Hasher) {
		let hash = x + y * 1_0000
		hasher.combine(hash)
	}
	
	func isNeighbor(to cell: Cell) -> Bool {
		let xDiff = abs(self.x - cell.x)
		let yDiff = abs(self.y - cell.y)
		
		switch (xDiff, yDiff) {
		case (1, 1), (0, 1), (1, 0):
			return true
		default:
			return false
		}
	}
	
	mutating func toggle() {
		switch state {
		case .alive:
			self.state = .dead
		case .dead:
			self.state = .alive
		}
	}
}
