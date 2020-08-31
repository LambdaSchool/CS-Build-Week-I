//
//  CellState.swift
//  ConwaysGameOfLife
//
//  Created by denis cedeno on 8/25/20.
//  Copyright © 2020 denisco. All rights reserved.
//

import Foundation

enum CellState: Int {
    case Living, Dead
    
    static func randomState() -> CellState {
        guard let cellState = CellState(rawValue: Int(arc4random_uniform(3))) else {
            return .Dead
        }
        return cellState
    }
    
    
}
