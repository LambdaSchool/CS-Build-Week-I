//
//  GameOfLifeTests.swift
//  GameOfLifeTests
//
//  Created by Chad Rutherford on 5/27/20.
//  Copyright © 2020 Chad Rutherford. All rights reserved.
//

import XCTest
@testable import GameOfLife

class GameOfLifeTests: XCTestCase {
	
	func testNeighbors() {
		var firstCell = Cell(x: 10, y: 10, state: .dead)
		var secondCell = Cell(x: 11, y: 11, state: .dead)
		XCTAssertTrue(firstCell.isNeighbor(to: secondCell))
		// True - Adjacent row, adjacent column.
		
		firstCell = Cell(x: 10, y: 10, state: .dead)
		secondCell = Cell(x: 11, y: 10, state: .dead)
		XCTAssertTrue(firstCell.isNeighbor(to: secondCell))
		// True - Same row, different (neighboring) column.

		firstCell = Cell(x: 10, y: 10, state: .dead)
		secondCell = Cell(x: 20, y: 10, state: .dead)
		XCTAssertFalse(firstCell.isNeighbor(to: secondCell))
		// False - Same row, very different (non-neighboring) column.

		firstCell = Cell(x: 10, y: 10, state: .dead)
		secondCell = Cell(x: 10, y: 10, state: .dead)
		XCTAssertFalse(firstCell.isNeighbor(to: secondCell))
		// false - Same row, same column.
	}
	
	func testWorldInitializesCorrectAmountOfCells() {
		let world = World(size: 4)
		// world creates size^2 cells
		// for a world of size 4 it should be 4^2 = 16
		XCTAssertEqual(16, world.cells.count)
	}
}
