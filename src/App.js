// App.js
import React, { useState, useEffect } from 'react';
import Canvas from './Components/Canvas';
import Game from './Components/Game';

function App() {
  // State variables for score, time, etc.
  const [score, setScore] = useState(0);
  const [time, setTime] = useState(0);

  // useEffect for game loop

  return (
    <div className="App">
      <h1>BLOCKS GAME </h1>
      <Game > </Game>
      {/* Other UI elements */}
    </div>
  );
}

export default App;
