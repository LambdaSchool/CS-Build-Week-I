//
//  GameRulesViewController.swift
//  GameOfLife
//
//  Created by Bharat Kumar on 7/28/20.
//  Copyright © 2020 Bharat Kumar. All rights reserved.
//

import UIKit

class GameRulesViewController: UIViewController {

    var gridView : CellGridView?
    var viewController: ViewController?
    
    @IBOutlet weak var speedOutlet: UISegmentedControl!
    @IBOutlet weak var colorOutlet: UISegmentedControl!
    override func viewDidLoad() {
        super.viewDidLoad()

              switch(gridView?.timeInterval) {
          case 0.50:
              speedOutlet.selectedSegmentIndex = 1
          case 0.75:
              speedOutlet.selectedSegmentIndex = 2
          case 1.00:
              speedOutlet.selectedSegmentIndex = 3
          default:
              speedOutlet.selectedSegmentIndex = 0
          }

          // Load current color
          switch(viewController?.buttonColor) {
          case UIColor.systemGreen:
              colorOutlet.selectedSegmentIndex = 1
          case UIColor.systemYellow:
              colorOutlet.selectedSegmentIndex = 2
          default: // UIColor.systemTeal
              colorOutlet.selectedSegmentIndex = 0
          }
    }
    
    @IBAction func speedSegmentedController(_ sender: UISegmentedControl) {
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
    
    @IBAction func colorSegmentedController(_ sender: UISegmentedControl) {
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
    /*
    // MARK: - Navigation

    // In a storyboard-based application, you will often want to do a little preparation before navigation
    override func prepare(for segue: UIStoryboardSegue, sender: Any?) {
        // Get the new view controller using segue.destination.
        // Pass the selected object to the new view controller.
    }
    */

}
