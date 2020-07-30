//
//  ViewController.swift
//  Game of Life
//
//  Created by Chris Dobek on 7/25/20.
//  Copyright © 2020 Chris Dobek. All rights reserved.
//

import UIKit

class GameOfLifeViewController: UIViewController {
    
    
    // MARK: Properties
    var cells: [UIButton] = []
    var cellsColor = UIColor.systemTeal {
        didSet {
           gridUpdate()
        }
    }
    
    // MARK: Outlets
    @IBOutlet weak var generationLabel: UILabel!
    @IBOutlet weak var populationLabel: UILabel!
    @IBOutlet weak var gridView: GridView!
    @IBOutlet weak var playButton: UIButton!
    
    //MARK: Actions
    @IBAction func clearButton(_ sender: UIButton) {
        pauseGame()
        gridView.clearGrid()
    }
    
    @IBAction func presetButton(_ sender: Any) {
        pauseGame()

        let alertController = UIAlertController(title: "Preset Patterns", message: "Select a Game of Life pattern:", preferredStyle: .alert)

        alertController.addAction(UIAlertAction(title: "Random", style: .default) { _ in
            self.gridView.presetPattern(pattern: .random)
        })

        alertController.addAction(UIAlertAction(title: "Behive", style: .default) { _ in
            self.gridView.presetPattern(pattern: .behive)
        })

        alertController.addAction(UIAlertAction(title: "Blinker", style: .default) { _ in
            self.gridView.presetPattern(pattern: .blinker)
        })

        alertController.addAction(UIAlertAction(title: "Toad", style: .default) { _ in
            self.gridView.presetPattern(pattern: .toad)
        })

        alertController.addAction(UIAlertAction(title: "Beacon", style: .default) { _ in
            self.gridView.presetPattern(pattern: .beacon)
        })

        alertController.addAction(UIAlertAction(title: "Pulsar", style: .default) { _ in
            self.gridView.presetPattern(pattern: .pulsar)
        })

        alertController.addAction(UIAlertAction(title: "Pentadecathlon", style: .default) { _ in
            self.gridView.presetPattern(pattern: .pentadecathlon)
        })

        alertController.addAction(UIAlertAction(title: "Glider", style: .default) { _ in
            self.gridView.presetPattern(pattern: .glider)
        })

        alertController.addAction(UIAlertAction(title: "Cancel", style: .default, handler: nil))

        present(alertController, animated: true, completion: nil)
    }
    
    @IBAction func playPauseButton(_ sender: Any) {
        if gridView.timerRunning {
            pauseGame()
        } else {
            playButton.isSelected = true
            gridView.startTimer()
        }
    }
    
    
    @IBAction func nextStepButton(_ sender: Any) {
        gridView.step()
    }
    

    override func viewDidLoad() {
        super.viewDidLoad()
        setupButtons()
        gridView.gameGrid.delegates = self
        showGeneration()
        showPopulation()
        gridUpdate()
    }
    
    @objc private func buttonTapped(_ sender: UIButton) {
        print(sender.tag)
        gridView.cellTapped(at: sender.tag)
    }

    private func pauseGame() {
        playButton.isSelected = false
        gridView.cancelTimer()
    }

    private func setupButtons() {
        var index = 0
        var topOffset = CGFloat(0)
        var leadingOffset = CGFloat(0)

        for y in 0..<gridView.gameGrid.size {
            for x in 0..<gridView.gameGrid.size {
                print(index, x, y)
                let button = UIButton()
                button.tag = index
                index += 1

                button.backgroundColor = .clear
                button.layer.borderWidth = 0.5
                button.layer.borderColor = UIColor.systemGray6.cgColor
                button.translatesAutoresizingMaskIntoConstraints = false
                button.addTarget(self, action: #selector(buttonTapped), for: .touchUpInside)

                gridView.addSubview(button)
                NSLayoutConstraint.activate([
                    button.topAnchor.constraint(equalTo: gridView.topAnchor, constant: topOffset),
                    button.leadingAnchor.constraint(equalTo: gridView.leadingAnchor, constant: leadingOffset),
                    button.heightAnchor.constraint(equalToConstant: 15),
                    button.widthAnchor.constraint(equalToConstant: 15)
                ])
                cells.append(button)

                leadingOffset += 15
                if leadingOffset >= 375 {
                    leadingOffset = 0
                }
            }
            topOffset += 15
        }
    }
    
    override func prepare(for segue: UIStoryboardSegue, sender: Any?) {
        if segue.identifier == "InfoSegue" {
            guard let vc = segue.destination as? InfoViewController else { return }
            vc.gridView = gridView
            vc.gameOfLifeViewController = self
        }
    }


}

extension GameOfLifeViewController: GameOfLifeDelegates {
    func gridUpdate() {
        var index = 0
        for cell in gridView.gameGrid.cells {
            if cell.state == .alive {
                cells[index].backgroundColor = cellsColor
            } else {
                cells[index].backgroundColor = .clear
            }
            index = index + 1
        }
    }

    func showGeneration() {
        generationLabel.text = "\(gridView.gameGrid.generation)"
    }

    func showPopulation() {
        populationLabel.text = "\(gridView.gameGrid.population)"
    }
}
