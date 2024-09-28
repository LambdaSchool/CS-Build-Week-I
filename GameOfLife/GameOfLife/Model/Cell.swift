//
//  Cell.swift
//  GameOfLife
//
//  Created by Bharat Kumar on 7/27/20.
//  Copyright © 2020 Bharat Kumar. All rights reserved.
//

import Foundation

public enum State {
    case dead
    case alive

}

class Cell: NSObject {
    
    var x: Int
    var y: Int
    var state: State
    
    public init(x: Int, y: Int, state: State = .dead) {
        self.x = x
        self.y = y
        self.state = state 
    }
}
