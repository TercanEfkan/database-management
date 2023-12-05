// App.js
import React, { useState, useEffect } from 'react';
import Header from './Components/Header'
import Canvas from './Components/Canvas';
import Game from './Components/Game';

function App() {
  // State variables for score, time, etc.
  const [score, setScore] = useState(0);
  const [time, setTime] = useState(0);

  // useEffect for game loop

  return (
    <div className="App" style = {appStyle}>
        <Header></Header>
        <Game> </Game>


      {/* Other UI elements */}
    </div>
  );
}
const appStyle = {
    background: 'linear-gradient(to right, #dd4d62, #f4dd02)'
};
export default App;
