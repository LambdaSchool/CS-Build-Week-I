import React from 'react';
import Game from './components/Game';
import Info from './components/Info';
import './scss/App.scss';

function App() {
  return (
    <div className="App">
      <Game />
      <Info />
    </div>
  );
}

export default App;
