//
//  GameOfLifeViewController.swift
//  GameOfLife
//
//  Created by Chad Rutherford on 5/26/20.
//  Copyright © 2020 Chad Rutherford. All rights reserved.
//

import SwiftUI
import UIKit

class GameOfLifeViewController: UIViewController {
	
	lazy var gameView: GameView = {
		let view = GameView(worldSize: 200, cellSize: 10)
		view.translatesAutoresizingMaskIntoConstraints = false
		view.isUserInteractionEnabled = true
		view.backgroundColor = .label
		view.layer.borderWidth = 8
		view.layer.borderColor = UIColor.systemGray.cgColor
		view.clipsToBounds = false
		return view
	}()
	
	let stepButton: UIButton = {
		let button = UIButton()
		button.translatesAutoresizingMaskIntoConstraints = false
		button.isUserInteractionEnabled = true
		let attributes = [
			NSAttributedString.Key.font: UIFont.systemFont(ofSize: 17, weight: .semibold),
			NSAttributedString.Key.foregroundColor: UIColor.systemBackground
		]
		button.setAttributedTitle(NSAttributedString(string: "Step", attributes: attributes), for: .normal)
		button.addTarget(self, action: #selector(stepGame), for: .touchUpInside)
		button.backgroundColor = .label
		button.layer.cornerRadius = 8
		return button
	}()
	
	let playButton: UIButton = {
		let button = UIButton()
		button.translatesAutoresizingMaskIntoConstraints = false
		button.isUserInteractionEnabled = true
		let attributes = [
			NSAttributedString.Key.font: UIFont.systemFont(ofSize: 17, weight: .semibold),
			NSAttributedString.Key.foregroundColor: UIColor.systemBackground
		]
		button.setAttributedTitle(NSAttributedString(string: "Play", attributes: attributes), for: .normal)
		button.addTarget(self, action: #selector(runGame), for: .touchUpInside)
		button.backgroundColor = .label
		button.layer.cornerRadius = 8
		return button
	}()
	
	let resetButton: UIButton = {
		let button = UIButton()
		button.translatesAutoresizingMaskIntoConstraints = false
		button.isUserInteractionEnabled = true
		let attributes = [
			NSAttributedString.Key.font: UIFont.systemFont(ofSize: 17, weight: .semibold),
			NSAttributedString.Key.foregroundColor: UIColor.systemBackground
		]
		button.setAttributedTitle(NSAttributedString(string: "Reset", attributes: attributes), for: .normal)
		button.addTarget(self, action: #selector(resetGame), for: .touchUpInside)
		button.backgroundColor = .label
		button.layer.cornerRadius = 8
		return button
	}()
	
	let stopButton: UIButton = {
		let button = UIButton()
		button.translatesAutoresizingMaskIntoConstraints = false
		button.isUserInteractionEnabled = true
		let attributes = [
			NSAttributedString.Key.font: UIFont.systemFont(ofSize: 17, weight: .semibold),
			NSAttributedString.Key.foregroundColor: UIColor.systemBackground
		]
		button.setAttributedTitle(NSAttributedString(string: "Stop", attributes: attributes), for: .normal)
		button.addTarget(self, action: #selector(stopGame), for: .touchUpInside)
		button.backgroundColor = .label
		button.layer.cornerRadius = 8
		return button
	}()
	
	let blinkerButton: UIButton = {
		let button = UIButton()
		button.translatesAutoresizingMaskIntoConstraints = false
		button.isUserInteractionEnabled = true
		let attributes = [
			NSAttributedString.Key.font: UIFont.systemFont(ofSize: 17, weight: .semibold),
			NSAttributedString.Key.foregroundColor: UIColor.systemBackground
		]
		button.setAttributedTitle(NSAttributedString(string: "Blinker", attributes: attributes), for: .normal)
		button.addTarget(self, action: #selector(presentBlinker), for: .touchUpInside)
		button.backgroundColor = .label
		button.layer.cornerRadius = 8
		return button
	}()
	
	let toadButton: UIButton = {
		let button = UIButton()
		button.translatesAutoresizingMaskIntoConstraints = false
		button.isUserInteractionEnabled = true
		let attributes = [
			NSAttributedString.Key.font: UIFont.systemFont(ofSize: 17, weight: .semibold),
			NSAttributedString.Key.foregroundColor: UIColor.systemBackground
		]
		button.setAttributedTitle(NSAttributedString(string: "Toad", attributes: attributes), for: .normal)
		button.addTarget(self, action: #selector(presentToad), for: .touchUpInside)
		button.backgroundColor = .label
		button.layer.cornerRadius = 8
		return button
	}()
	
	let pulsarButton: UIButton = {
		let button = UIButton()
		button.translatesAutoresizingMaskIntoConstraints = false
		button.isUserInteractionEnabled = true
		let attributes = [
			NSAttributedString.Key.font: UIFont.systemFont(ofSize: 17, weight: .semibold),
			NSAttributedString.Key.foregroundColor: UIColor.systemBackground
		]
		button.setAttributedTitle(NSAttributedString(string: "Pulsar", attributes: attributes), for: .normal)
		button.addTarget(self, action: #selector(presentPulsar), for: .touchUpInside)
		button.backgroundColor = .label
		button.layer.cornerRadius = 8
		return button
	}()
	
	let gliderButton: UIButton = {
		let button = UIButton()
		button.translatesAutoresizingMaskIntoConstraints = false
		button.isUserInteractionEnabled = true
		let attributes = [
			NSAttributedString.Key.font: UIFont.systemFont(ofSize: 17, weight: .semibold),
			NSAttributedString.Key.foregroundColor: UIColor.systemBackground
		]
		button.setAttributedTitle(NSAttributedString(string: "Glider", attributes: attributes), for: .normal)
		button.addTarget(self, action: #selector(presentGlider), for: .touchUpInside)
		button.backgroundColor = .label
		button.layer.cornerRadius = 8
		return button
	}()
	
	let outerStackView: UIStackView = {
		let stack = UIStackView()
		stack.translatesAutoresizingMaskIntoConstraints = false
		stack.axis = .vertical
		stack.alignment = .fill
		stack.distribution = .fillEqually
		stack.spacing = 20
		return stack
 	}()
	
	let innerTopStackView: UIStackView = {
		let stack = UIStackView()
		stack.axis = .horizontal
		stack.alignment = .fill
		stack.distribution = .fillEqually
		stack.spacing = 40
		return stack
	}()
	
	let innerBottomStackView: UIStackView = {
		let stack = UIStackView()
		stack.axis = .horizontal
		stack.alignment = .fill
		stack.distribution = .fillEqually
		stack.spacing = 40
		return stack
	}()
	
	let generationLabel: UILabel = {
		let label = UILabel()
		label.translatesAutoresizingMaskIntoConstraints = false
		label.font = UIFont.systemFont(ofSize: 17, weight: .semibold)
		label.text = "Generation: 0"
		label.textColor = .label
		return label
	}()
	
	var timer: CADisplayLink!
	
	override func viewDidLoad() {
		super.viewDidLoad()
		setupUI()
		setupNavController()
		NotificationCenter.default.addObserver(self, selector: #selector(updateGeneration), name: .generationChanged, object: nil)
	}
	
	private func setupUI() {
		view.backgroundColor = .systemBackground
		view.addSubview(generationLabel)
		view.addSubview(gameView)
		view.addSubview(stepButton)
		view.addSubview(playButton)
		view.addSubview(resetButton)
		view.addSubview(stopButton)
		view.addSubview(outerStackView)
		outerStackView.addArrangedSubview(innerTopStackView)
		outerStackView.addArrangedSubview(innerBottomStackView)
		innerTopStackView.addArrangedSubview(blinkerButton)
		innerTopStackView.addArrangedSubview(toadButton)
		innerBottomStackView.addArrangedSubview(pulsarButton)
		innerBottomStackView.addArrangedSubview(gliderButton)
		NSLayoutConstraint.activate([
			generationLabel.topAnchor.constraint(equalTo: view.safeAreaLayoutGuide.topAnchor, constant: 20),
			generationLabel.centerXAnchor.constraint(equalTo: view.centerXAnchor),
			
			gameView.topAnchor.constraint(equalTo: generationLabel.bottomAnchor, constant: 16),
			gameView.widthAnchor.constraint(equalToConstant: 300),
			gameView.heightAnchor.constraint(equalTo: gameView.widthAnchor, multiplier: 1),
			gameView.centerXAnchor.constraint(equalTo: view.centerXAnchor),
			
			stepButton.topAnchor.constraint(equalTo: gameView.bottomAnchor, constant: 20),
			stepButton.heightAnchor.constraint(equalToConstant: 40),
			stepButton.leadingAnchor.constraint(equalTo: gameView.leadingAnchor),
			stepButton.widthAnchor.constraint(equalTo: gameView.widthAnchor, multiplier: 0.3),
			
			resetButton.topAnchor.constraint(equalTo: gameView.bottomAnchor, constant: 20),
			resetButton.heightAnchor.constraint(equalToConstant: 40),
			resetButton.leadingAnchor.constraint(equalTo: stepButton.trailingAnchor, constant: 16),
			resetButton.widthAnchor.constraint(equalTo: gameView.widthAnchor, multiplier: 0.3),
			
			playButton.topAnchor.constraint(equalTo: gameView.bottomAnchor, constant: 20),
			playButton.heightAnchor.constraint(equalToConstant: 40),
			playButton.trailingAnchor.constraint(equalTo: gameView.trailingAnchor),
			playButton.widthAnchor.constraint(equalTo: gameView.widthAnchor, multiplier: 0.3),
			
			stopButton.topAnchor.constraint(equalTo: resetButton.bottomAnchor, constant: 20),
			stopButton.leadingAnchor.constraint(equalTo: resetButton.leadingAnchor),
			stopButton.heightAnchor.constraint(equalToConstant: 40),
			stopButton.trailingAnchor.constraint(equalTo: resetButton.trailingAnchor),
			
			outerStackView.topAnchor.constraint(equalTo: stopButton.bottomAnchor, constant: 20),
			outerStackView.leadingAnchor.constraint(equalTo: gameView.leadingAnchor),
			outerStackView.trailingAnchor.constraint(equalTo: gameView.trailingAnchor)
		])
	}
	
	private func setupNavController() {
		title = "Game Of Life"
		navigationController?.navigationBar.prefersLargeTitles = true
		navigationItem.rightBarButtonItem = UIBarButtonItem(
			image: UIImage(systemName: "info.circle"),
			style: .plain,
			target: self,
			action: #selector(presentAboutScreen)
		)
		navigationItem.rightBarButtonItem?.tintColor = .label
	}
	
	@objc private func stepGame() {
		if gameView.world.cells == [] {
			gameView.world.createRandom()
		}
		gameView.world.updateCells()
		gameView.setNeedsDisplay()
	}
	
	@objc private func runGame() {
		gameView.state = .running
		gameView.autoRun()
	}
	
	@objc private func stopGame() {
		gameView.state = .stopped
		gameView.setNeedsDisplay()
	}
	
	@objc private func resetGame() {
		gameView.world.createRandom()
		gameView.state = .stopped
		gameView.setNeedsDisplay()
	}
	
	@objc private func presentBlinker() {
		gameView.world.createBlinker()
		gameView.setNeedsDisplay()
	}
	
	@objc private func presentToad() {
		gameView.world.createToad()
		gameView.setNeedsDisplay()
	}
	
	@objc private func presentPulsar() {
		gameView.world.createPulsar()
		gameView.setNeedsDisplay()
	}
	
	@objc private func presentGlider() {
		gameView.world.createGlider()
		gameView.setNeedsDisplay()
	}
	
	@objc private func presentAboutScreen() {
		let aboutGameVC = AboutGameViewController(nibName: nil, bundle: nil)
		navigationController?.pushViewController(aboutGameVC, animated: true)
	}
	
	@objc private func updateGeneration() {
		generationLabel.text = "Generation: \(gameView.world.generation)"
	}
}

@available(iOS 13, *)
struct AboutGamePreview: PreviewProvider {
	static var previews: some View {
		GameOfLifeViewController().asPreview()
			.edgesIgnoringSafeArea(.all)
			.colorScheme(.dark)
	}
}
