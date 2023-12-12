import React, { useState, useEffect } from 'react';
import Header from './Components/Header';
import Game from './Components/Game';
import MainMenu from './Components/mainMenu';
import LeaderBoard from './Components/leaderBoard';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AboutUs from './Components/aboutUs';
import SignUp from './Components/SignUp';
import LogIn from './Components/Login';
import Profile from './Components/Profile';

function App() {
    const [userID, setUserID] = useState(() => {
        // Retrieve userID from localStorage on initial load
        return JSON.parse(localStorage.getItem('userID')) || -1;
    });

    // Save userID to localStorage whenever it changes
    useEffect(() => {
        localStorage.setItem('userID', JSON.stringify(userID));
    }, [userID]);

    return (
        <div className="App" style={appStyle}>
            <BrowserRouter>
                <Header userID={userID} />
                <Routes>
                    <Route path="/" element={<MainMenu userID={userID} />} />
                    <Route path="/game" element={<Game userID={userID} />} />
                    <Route path="/leaderboard" element={<LeaderBoard userID={userID} />} />
                    <Route path="/about" element={<AboutUs userID={userID} />} />
                    <Route path="/login" element={<LogIn setUserID={setUserID} />} />
                    <Route path="/signup" element={<SignUp setUserID={setUserID} />} />
                    <Route path="/profile" element={<Profile userID={userID} />} />
                </Routes>
            </BrowserRouter>
            {/* Other UI elements */}
        </div>
    );
}

const appStyle = {
    background: 'linear-gradient(to right, #333, #555)',
};

export default App;
