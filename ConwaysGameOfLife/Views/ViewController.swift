//
//  ViewController.swift
//  ConwaysGameOfLife
//
//  Created by denis cedeno on 8/24/20.
//  Copyright © 2020 denisco. All rights reserved.
//

import UIKit

class ViewController: UIViewController {
    
    @IBOutlet weak var boardView: UIView!
    @IBOutlet var genLabel: UILabel!
    private var playButton:UIButton = UIButton()
    
    @IBOutlet weak var infoButton: UIBarButtonItem!
    
    var life = Life()
    let gameBoard: GameBoard
    var genCount = 1
    var runAnimation = false
    
    required init?(coder aDecoder: NSCoder) {
        gameBoard = GameBoard(createLife: life)
        
        super.init(coder: aDecoder )
    }
    
    override func viewDidLoad() {
        super.viewDidLoad()
        gameBoard.frame = boardView.frame
        gameBoard.center = CGPoint(x: gameBoard.frame.size.width/2, y: gameBoard.frame.size.height/2)
        boardView.addSubview(gameBoard)

        let titlelabel = UILabel(frame: CGRect(x: 0, y: 0, width: 400, height: 30))
        titlelabel.center = CGPoint(x: 155, y: 80)
        titlelabel.textAlignment = NSTextAlignment.center
        titlelabel.font = UIFont.boldSystemFont(ofSize: 24)
        titlelabel.text = "Conway's Game of life"
        self.view.addSubview(titlelabel)
        
        let label = UILabel(frame: CGRect(x: 0, y: 0, width: 200, height: 21))
        label.center = CGPoint(x: 80, y: 128)
        label.textAlignment = NSTextAlignment.center
        label.text = "Generations"
        self.view.addSubview(label)
        
        self.genLabel = UILabel(frame: CGRect(x: 0, y: 0, width: 200, height: 21))
        self.genLabel.center = CGPoint(x: 160, y: 128)
        self.genLabel.textAlignment = NSTextAlignment.center
        self.genLabel.text = "\(self.genCount)"
        self.view.addSubview(genLabel)
        
        playButton.frame = CGRect(x: 20, y: 560, width: 100, height: 100)
        playButton.setImage(UIImage(systemName: "play.rectangle.fill"), for: .normal)
        playButton.setPreferredSymbolConfiguration( .init(scale: .large), forImageIn: .normal)
        playButton.tintColor = .black
        playButton.addTarget(self, action:#selector(self.testButtonClicked), for: .touchUpInside)
        self.view.addSubview(playButton)
        
        animate()
    }
 
    public func animate() {
        if !runAnimation {return}
         playButton.setImage(UIImage(systemName: "pause.rectangle.fill"), for: .normal)
        DispatchQueue.main.asyncAfter(deadline: .now()) {
            self.life.updateCells()
            self.genCount += 1
            self.genLabel.text = "\(self.genCount)"
            self.gameBoard.setNeedsDisplay()
            self.animate()
        }
    }
    

    @objc func testButtonClicked(sender:UIButton){
        if runAnimation == true {
            playButton.setImage(UIImage(systemName: "play.rectangle.fill"), for: .normal)
            runAnimation = false
        } else if runAnimation == false {
            playButton.setImage(UIImage(systemName: "pause.rectangle.fill"), for: .normal)
            runAnimation = true
            animate()
        }
    }
    
    
}

