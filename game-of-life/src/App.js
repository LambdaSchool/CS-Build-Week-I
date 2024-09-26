import React, {useState} from 'react';
import './App.scss';
import useInterval from './hooks/useInterval'
import Slider from './components/Slider'
import BoardGrid from './components/Board'
import newBoardStatus from './builds/newBoardStatus'
import runGame from './builds/runGame'


const size = 25

function App() {
  const [gameStatus, setGameStatus] = useState({
    boardStatus: newBoardStatus(),
    generation: 0,
    isGameRunning: false,
    speed: 150
  })
  function clearBoard(e) {
    e.preventDefault()
    setGameStatus({...gameStatus, boardStatus: newBoardStatus(()=>{
      const cell = {
        status : false,
        aliveCount: 0
      }
      return cell
    }), isGameRunning: false, generation: 0})
  }
  function newGame(e){
    e.preventDefault()
    setGameStatus({...gameStatus, boardStatus: newBoardStatus(), isGameRunning: false, generation: 0})
  }
  function toggleRun(e){
    e.preventDefault()
    setGameStatus({...gameStatus, isGameRunning: !gameStatus.isGameRunning})
  }
  function changeSpeed(newSpeed) {
    setGameStatus({...gameStatus, speed: newSpeed})
  }
  useInterval(()=>{
    runGame(gameStatus, setGameStatus, size)
  }, gameStatus.isGameRunning?gameStatus.speed:null)
  
  return (
    <div className="App">
          <div className="buttons">
            <button onClick={toggleRun}>{gameStatus.isGameRunning?'Pause':'Start'}</button>
            <button onClick={clearBoard}>Clear</button>
            <button onClick={newGame}>Start New</button>
          </div>
          <div className="interval">
          <label>Interval Steps<Slider speed={gameStatus.speed} onSpeedChange={changeSpeed}/>{gameStatus.speed}ms
          </label>
          </div>
          <div className="gen">Generation: {gameStatus.generation}</div>
        
        <BoardGrid gameStatus={gameStatus} setGameStatus={setGameStatus} size={size}/>
      <section className='rules'>
        <h1><a href='https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life' target='_blank' rel="noopener noreferrer">
Rules of the Game</a></h1>
        <ul>
          <li>Any live cell with fewer than two live neighbours dies, as if by underpopulation.</li>
          <li>Any live cell with two or three live neighbours lives on to the next generation.</li>
          <li className='second'>Any live cell with more than three live neighbours dies, as if by overpopulation.</li>
          <li className='third'>Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.</li>
        </ul>
      </section>
      
      
      
    </div>
  )
}

export default App;