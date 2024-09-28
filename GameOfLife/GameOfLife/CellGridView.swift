//
//  CellGridView.swift
//  GameOfLife
//
//  Created by Bharat Kumar on 7/27/20.
//  Copyright © 2020 Bharat Kumar. All rights reserved.
//

import Foundation
import UIKit

class CellGridView: UIView {
    
    var gridWorld = GridWorld(gridSize: 25)
    private var cellSize: Int = 15
    private var timer: Timer?
    var timeInterval = 0.25
    var timerRunning: Bool {
        timer == nil ? false : true
    }
    
    
    public convenience init(gridSize: Int, cellSize: Int) {
        let frame = CGRect(x: 0, y: 0, width: cellSize * gridSize, height: cellSize * gridSize)
        self.init(frame: frame)
        self.gridWorld = GridWorld(gridSize: gridSize)
        self.cellSize = cellSize
    }
    
    public required init?(coder aDecoder: NSCoder) {
        super.init(coder: aDecoder)
    }

    public override init(frame: CGRect) {
        super.init(frame: frame)
    }
    
    public func cancelTimer() {
        timer?.invalidate()
        timer = nil
    }
    
    public func cellTapped(at index: Int) {
        gridWorld.cellTapped(at: index)
        setNeedsDisplay()
    }
    
    @objc private func performGameTurn() {
        self.gridWorld.performGameTurn()
        self.setNeedsDisplay()
    }
    
    public func startTimer() {
        timer = Timer.scheduledTimer(timeInterval: timeInterval, target: self, selector: #selector(performGameTurn), userInfo: nil, repeats: true)
        
    }
    
    public func step() {
        gridWorld.performGameTurn()
        setNeedsDisplay()
    }
    
    public func useExamplePattern(pattern: Patterns) {
        gridWorld.clearGrid()
        gridWorld.useExamplePattern(pattern: pattern)
        setNeedsDisplay()
    }
    
}
