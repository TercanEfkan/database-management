// App.js
import React, { useState, useEffect } from 'react';
import Canvas from './Components/Canvas';

function App() {
  // State variables for score, time, etc.
  const [score, setScore] = useState(0);
  const [time, setTime] = useState(0);

  // useEffect for game loop

  return (
    <div className="App">
      <h1>BLOCKS GAME </h1>
      <Canvas style={{ border: "222px solid #FFF" }}> </Canvas>
      {/* Other UI elements */}
    </div>
  );
}

export default App;
