//
//  RulesViewController.swift
//  Game of Life
//
//  Created by Mark Gerrior on 6/25/20.
//  Copyright © 2020 Mark Gerrior. All rights reserved.
//

import UIKit

class RulesViewController: UIViewController {

    // MARK: - Properites
    var gridView: GridView?
    var viewController: ViewController?

    // MARK: - Actions
    @IBAction func colorSegmentedControl(_ sender: UISegmentedControl) {
        switch(sender.selectedSegmentIndex) {
        case 1:
            viewController?.buttonColor = UIColor.systemGreen
        case 2:
            viewController?.buttonColor = UIColor.systemYellow
        default:
            viewController?.buttonColor = UIColor.systemTeal
        }
    }

    @IBAction func okButton(_ sender: Any) {
        dismiss(animated: true, completion: nil)
    }

    @IBAction func speedSegmentedControl(_ sender: UISegmentedControl) {
        switch(sender.selectedSegmentIndex) {
        case 1:
            gridView?.timeInterval = 0.50
        case 2:
            gridView?.timeInterval = 0.75
        case 3:
            gridView?.timeInterval = 1.00
        default:
            gridView?.timeInterval = 0.25
        }
    }

    // MARK: - Outlets
    @IBOutlet weak var speedSegmentedControl: UISegmentedControl!
    @IBOutlet weak var colorSegmentedControl: UISegmentedControl!

    // MARK: - View Lifecycle
    override func viewDidLoad() {
        super.viewDidLoad()

        // Load current speed
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

        // Load current color
        switch(viewController?.buttonColor) {
        case UIColor.systemGreen:
            colorSegmentedControl.selectedSegmentIndex = 1
        case UIColor.systemYellow:
            colorSegmentedControl.selectedSegmentIndex = 2
        default: // UIColor.systemTeal
            colorSegmentedControl.selectedSegmentIndex = 0
        }
    }
}
