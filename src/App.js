// App.js
import React from 'react';
import Header from './Components/Header'
import Game from './Components/Game';
import MainMenu from "./Components/mainMenu";
import LeaderBoard from "./Components/leaderBoard";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AboutUs from "./Components/aboutUs";
import SignUp from "./Components/SignUp";
import LogIn from "./Components/Login";
import Profile from "./Components/Profile";

function App() {
    let username;

  return (
    <div className="App" style = {appStyle}>

        <BrowserRouter>
            <Header/>
            <Routes>
                <Route path="/" element = {<MainMenu/>}/>
                <Route path="/game" element={<Game />} />
                <Route path="/leaderboard" element={<LeaderBoard />} />
                <Route path="/about" element={<AboutUs />} />
                <Route path="/login" element={<LogIn />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/profile" element={<Profile />} />
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
