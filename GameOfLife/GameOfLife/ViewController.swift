//
//  ViewController.swift
//  GameOfLife
//
//  Created by Bharat Kumar on 7/27/20.
//  Copyright © 2020 Bharat Kumar. All rights reserved.
//

import UIKit
import AVFoundation
class ViewController: UIViewController {

    @IBOutlet weak var generationLabel: UILabel!
    @IBOutlet weak var populationLabel: UILabel!
    @IBOutlet weak var gridView: CellGridView!
    @IBOutlet weak var playButtonOutlet: UIButton!
    
    var audioPlayer = AVAudioPlayer()
    var buttons: [UIButton] = []
       var buttonColor = UIColor.systemTeal {
           didSet {
               gridUpdated()
           }
       }
    override func viewDidLoad() {
        super.viewDidLoad()
        setupButtons()
        gridView.gridWorld.delegate = self
        showGeneration()
        showPopulation()
        gridUpdated()
        correctAndWrongAudio()
        // Do any additional setup after loading the view.
    }
    @IBAction func playButtonTapped(_ sender: Any) {
        
        if gridView.timerRunning {
            pauseGame()
            audioPlayer.stop()
        } else {
            playButtonOutlet.isSelected = true
            gridView.startTimer()
            audioPlayer.play()
        }
    }
    @IBAction func clearButtonTapped(_ sender: UIButton) {
        pauseGame()
        gridView.gridWorld.clearGrid()
    }
    
    @IBAction func stepOver(_ sender: UIButton) {
        gridView.step()
    }
    @IBAction func patternsButtonTapped(_ sender: UIButton) {
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
    private func pauseGame() {
        playButtonOutlet.isSelected = false
        gridView.cancelTimer()
    }
    
    @objc private func buttonTapped(_ sender: UIButton) {
           print(sender.tag)
           gridView.cellTapped(at: sender.tag)
       }
    private func setupButtons() {
        var index = 0
        var topOffset = CGFloat(0)
        var leadingOffset = CGFloat(0)

        for y in 0..<gridView.gridWorld.size {
            for x in 0..<gridView.gridWorld.size {
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
              guard let vc = segue.destination as? GameRulesViewController else { return }
              vc.gridView = gridView
              vc.viewController = self
          }
      }

}

extension ViewController: GameStatsDelegate {
   func gridUpdated() {
          var index = 0
          for cell in gridView.gridWorld.cells {
              if cell.state == .alive {
                  buttons[index].backgroundColor = buttonColor
              } else {
                  buttons[index].backgroundColor = .clear
              }
              index = index + 1
          }
      }

    func showGeneration() {
        generationLabel.text = "\(gridView.gridWorld.generation)"
    }

    func showPopulation() {
        populationLabel.text = "\(gridView.gridWorld.population)"
        if gridView.gridWorld.population >= 70 {
            populationLabel.textColor = UIColor.green
        } else if gridView.gridWorld.population >= 50 {
            populationLabel.textColor = UIColor.yellow
        } else {
            populationLabel.textColor = .red
        }
    }
    
    private func correctAndWrongAudio() {
        let sound = Bundle.main.path(forResource: "Sky", ofType: "mp3")
        do {
            audioPlayer = try AVAudioPlayer(contentsOf: URL(fileURLWithPath: sound!))
            
            try AVAudioSession.sharedInstance().setCategory(.playback, options: .mixWithOthers)
            
        } catch {
            print(error)
        }
    }
}
