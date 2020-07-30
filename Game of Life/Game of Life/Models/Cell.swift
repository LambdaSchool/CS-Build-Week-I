//
//  Cell.swift
//  Game of Life
//
//  Created by Chris Dobek on 7/27/20.
//  Copyright © 2020 Chris Dobek. All rights reserved.
//

import Foundation

public enum State {
    case dead
    case alive
}

public class Cell: NSObject {
    public let x: Int
    public let y: Int
    public var state: State
    
    public init(x: Int, y: Int, state: State = .dead) {
        self.x = x
        self.y = y
        self.state = state
    }
}
