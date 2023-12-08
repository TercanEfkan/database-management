// App.js
import React, { useState, useEffect } from 'react';
import Header from './Components/Header'
import Canvas from './Components/Canvas';
import Game from './Components/Game';
import MainMenu from "./Components/mainMenu";
import LeaderBoard from "./Components/leaderBoard";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AboutUs from "./Components/aboutUs";

function App() {
  // State variables for score, time, etc.
  const [score, setScore] = useState(0);
  const [time, setTime] = useState(0);

  // useEffect for game loop

  return (
    <div className="App" style = {appStyle}>

        <BrowserRouter>
            <Header/>
            <Routes>
                <Route path="/mainmenu" element = {<MainMenu/>}/>
                <Route path="/game" element={<Game />} />
                <Route path="/leaderboard" element={<LeaderBoard />} />
                <Route path="/about" element={<AboutUs />} />
            </Routes>
        </BrowserRouter>
      {/* Other UI elements */}
    </div>
  );
}
const appStyle = {
    background: 'linear-gradient(to right, #333, #555)'
};
export default App;
