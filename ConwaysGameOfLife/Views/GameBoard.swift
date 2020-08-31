//
//  GameBoard.swift
//  ConwaysGameOfLife
//
//  Created by denis cedeno on 8/25/20.
//  Copyright © 2020 denisco. All rights reserved.
//

import UIKit

class GameBoard: UIView {
    
    let life: Life
    
    init(createLife: Life) {
        life = createLife
        super.init(frame: CGRect(x: 0,y: 0,width: 0,height: 0))
    }
    
    required init?(coder: NSCoder) {
        fatalError("init(coder:) has not been implemented")
    }
    
    
    override func draw(_ rect: CGRect) {
        let currentContext = UIGraphicsGetCurrentContext()
        
        for cell in life.cells {
            currentContext!.setFillColor(colorForCell(cellState: cell.cellState).cgColor)
            currentContext!.addRect(frameForCell(cell: cell))
            currentContext!.fillPath()
        }
    }
    
    
    func colorForCell(cellState: CellState) -> UIColor {
        switch cellState {
        case .Living:
            return UIColor(red: 0/255, green: 0/255, blue: 0/255, alpha: 1.0)
        case .Dead:
            return UIColor(red: 255/255, green: 255.255, blue: 255/255, alpha: 1.0)
        }
    }
    
    func frameForCell(cell: Cell) -> CGRect {
        let dimensions = CGFloat(self.life.gridSize)
        let cellSize = CGSize(width: self.bounds.width/dimensions, height: self.bounds.height/dimensions)
        return CGRect(x: CGFloat(cell.x) * cellSize.width, y: CGFloat(cell.y) * cellSize.height, width: cellSize.width, height: cellSize.height)
    }
    

}
