//
//  ViewController.swift
//  Game of Life
//
//  Created by Mark Gerrior on 6/24/20.
//  Copyright © 2020 Mark Gerrior. All rights reserved.
//

import UIKit

class ViewController: UIViewController {

    // MARK: - Properites
    var buttons: [UIButton] = []
    var buttonColor = UIColor.systemTeal {
        didSet {
            gridUpdated()
        }
    }

    // MARK: - Outlets

    @IBOutlet weak var generationLabel: UILabel!
    @IBOutlet weak var populationLabel: UILabel!
    @IBOutlet weak var gridView: GridView!
    @IBOutlet weak var playButtonOutlet: UIButton!

    // MARK: - Actions

    @IBAction func clearButton(_ sender: UIButton) {
        pauseGame()
        gridView.clearGrid()
    }

    @IBAction func patternsButton(_ sender: Any) {
        pauseGame()

        let alertController = UIAlertController(title: "Example Patterns", message: "Select a Game of Life pattern:", preferredStyle: .alert)

        alertController.addAction(UIAlertAction(title: "Random Pattern", style: .default) { _ in
            self.gridView.useExamplePattern(pattern: .random)
        })

        alertController.addAction(UIAlertAction(title: "Behive", style: .default) { _ in
            self.gridView.useExamplePattern(pattern: .behive)
        })

        alertController.addAction(UIAlertAction(title: "Blinker", style: .default) { _ in
            self.gridView.useExamplePattern(pattern: .blinker)
        })

        alertController.addAction(UIAlertAction(title: "Toad", style: .default) { _ in
            self.gridView.useExamplePattern(pattern: .toad)
        })

        alertController.addAction(UIAlertAction(title: "Beacon", style: .default) { _ in
            self.gridView.useExamplePattern(pattern: .beacon)
        })

        alertController.addAction(UIAlertAction(title: "Pulsar", style: .default) { _ in
            self.gridView.useExamplePattern(pattern: .pulsar)
        })

        alertController.addAction(UIAlertAction(title: "Pentadecathlon", style: .default) { _ in
            self.gridView.useExamplePattern(pattern: .pentadecathlon)
        })

        alertController.addAction(UIAlertAction(title: "Glider", style: .default) { _ in
            self.gridView.useExamplePattern(pattern: .glider)
        })

        alertController.addAction(UIAlertAction(title: "Cancel", style: .default, handler: nil))

        present(alertController, animated: true, completion: nil)
    }

    @IBAction func playPausebutton(_ sender: Any) {
        if gridView.timerRunning {
            pauseGame()
        } else {
            playButtonOutlet.isSelected = true
            gridView.startTimer()
        }
    }

    @IBAction func stepButton(_ sender: UIButton) {
        gridView.step()
    }

    // MARK: - View Lifecycle

    override func viewDidLoad() {
        super.viewDidLoad()
        // Do any additional setup after loading the view.
        setupButtons()
        gridView.gameGrid.delegate = self
        showGeneration()
        showPopulation()
        gridUpdated()
    }

    // MARK: - Private
    @objc private func buttonTapped(_ sender: UIButton) {
        print(sender.tag)
        gridView.cellTapped(at: sender.tag)
    }

    private func pauseGame() {
        playButtonOutlet.isSelected = false
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
                buttons.append(button)

                leadingOffset += 15
                if leadingOffset >= 375 {
                    leadingOffset = 0
                }
            }
            topOffset += 15
        }
    }

    override func prepare(for segue: UIStoryboardSegue, sender: Any?) {
        if segue.identifier == "RulesSegue" {
            guard let vc = segue.destination as? RulesViewController else { return }
            vc.gridView = gridView
            vc.viewController = self
        }
    }
}

extension ViewController: GameStatsDelegate {
    func gridUpdated() {
        var index = 0
        for cell in gridView.gameGrid.cells {
            if cell.state == .alive {
                buttons[index].backgroundColor = buttonColor
            } else {
                buttons[index].backgroundColor = .clear
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
