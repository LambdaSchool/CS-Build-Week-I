//
//  Cell.swift
//  Game of Life
//
//  Created by Mark Gerrior on 6/25/20.
//  Copyright © 2020 Mark Gerrior. All rights reserved.
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
