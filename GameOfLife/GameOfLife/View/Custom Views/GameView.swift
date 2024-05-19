//
//  GameView.swift
//  GameOfLife
//
//  Created by Chad Rutherford on 5/27/20.
//  Copyright © 2020 Chad Rutherford. All rights reserved.
//

import UIKit

enum GameViewState {
	case running, stopped
}

class GameView: UIView {
	var world: World = World(size: 0)
	var cellSize = 40
	
	var state: GameViewState = .running
	
	convenience init(worldSize: Int, cellSize: Int) {
		let frame = CGRect(x: 0, y: 0, width: worldSize * worldSize, height: worldSize * worldSize)
		self.init(frame: frame)
		self.world = World(size: worldSize)
		self.cellSize = cellSize
		contentMode = .redraw
	}
	
	convenience init() {
		let frame = CGRect(x: 0, y: 0, width: 1000, height: 1000)
		self.init(frame: frame)
		contentMode = .redraw
	}
	
	override init(frame: CGRect) {
		super.init(frame: frame)
		contentMode = .redraw
	}
	
	@available(*, unavailable)
	required init?(coder: NSCoder) {
		fatalError("init(coder:) has not been implemented")
	}
	
	override func draw(_ rect: CGRect) {
		let context = UIGraphicsGetCurrentContext()
		context?.saveGState()
		for cell in world.cells {
			let rect = CGRect(x: cell.x * cellSize, y: cell.y * cellSize, width: cellSize, height: cellSize)
			let color = cell.state == .alive ? UIColor.systemBackground.cgColor : UIColor.label.cgColor
			context?.addRect(rect)
			context?.setFillColor(color)
			context?.fill(rect)
		}
		context?.restoreGState()
	}
	
	func autoRun() {
		DispatchQueue.main.asyncAfter(deadline: .now() + 0.2) {
			if self.state == .running {
				self.world.updateCells()
				self.setNeedsDisplay()
				self.autoRun()
			}
		}
	}
}
