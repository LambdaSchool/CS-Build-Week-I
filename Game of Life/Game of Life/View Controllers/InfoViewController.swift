//
//  InfoViewController.swift
//  Game of Life
//
//  Created by Chris Dobek on 7/25/20.
//  Copyright © 2020 Chris Dobek. All rights reserved.
//

import UIKit

class InfoViewController: UIViewController {
    
    // MARK: Properties
    var gridView: GridView?
    var gameOfLifeViewController: GameOfLifeViewController?
    
    //MARK: Outlets
    @IBOutlet weak var speedSegmentedControl: UISegmentedControl!
    @IBOutlet weak var colorSegmentedControl: UISegmentedControl!
    
    
    // MARK: Actions
    @IBAction func colorSegmentedControl(_ sender: UISegmentedControl) {
        switch (sender.selectedSegmentIndex) {
        case 1:
            gameOfLifeViewController?.cellsColor = UIColor.systemYellow
        case 2:
            gameOfLifeViewController?.cellsColor = UIColor.systemOrange
        case 3:
            gameOfLifeViewController?.cellsColor = UIColor.systemPurple
        default:
            gameOfLifeViewController?.cellsColor = UIColor.systemTeal
        }
    }
    
    
    @IBAction func speedSegmentedControl(_ sender: UISegmentedControl) {
        switch (sender.selectedSegmentIndex) {
        case 1:
            gridView?.timeInterval = 0.50
        case 2:
            gridView?.timeInterval = 0.75
        case 3:
            gridView?.timeInterval = 1.0
        default:
            gridView?.timeInterval = 0.25
        }
    }
    
    
    @IBAction func letsPlayButton(_ sender: Any) {
        dismiss(animated: true, completion: nil)
    }
    
    // MARK: View Lifecycle
    override func viewDidLoad() {
        super.viewDidLoad()
        
        // Load the current speed
        switch(gridView?.timeInterval) {
        case 0.50:
            speedSegmentedControl.selectedSegmentIndex = 1
        case 0.75:
            speedSegmentedControl.selectedSegmentIndex = 2
        case 1.00:
            speedSegmentedControl.selectedSegmentIndex = 3
        default:
            speedSegmentedControl.selectedSegmentIndex = 0
        }
        // Load the current color
        switch(gameOfLifeViewController?.cellsColor) {
        case UIColor.systemYellow:
            colorSegmentedControl.selectedSegmentIndex = 1
        case UIColor.systemOrange:
            colorSegmentedControl.selectedSegmentIndex = 2
        case UIColor.systemPurple:
            colorSegmentedControl.selectedSegmentIndex = 3
        default: // Default to system teal
            colorSegmentedControl.selectedSegmentIndex = 0
        }
    }
}
