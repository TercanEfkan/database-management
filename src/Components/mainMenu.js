import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Game from './Game';
const MainMenu = () => {
    return (
        <div style={middleStyle}>
            <button style = {buttonStyle} >Play </button>
            <button style = {buttonStyle} >LeaderBoard</button>
            <button style = {buttonStyle} >Profile</button>
            <button style = {buttonStyle} >SignUp</button>

        </div>
    );
};
const buttonStyle = {

    width: '30vw',
    height: '50px',
    textDecoration: 'none',
    marginBottom: '5px',
    color: '#000000',
    background: 'linear-gradient(to right, #202020, #404040)',
};
const middleStyle = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: '30vw', // Shift 50px to the left
    width: '45vw',
    height: '30vw',
    backgroundColor: '#333',
    color: '#000000',
    fontSize: '1rem',
    border: '10px solid grey',
    boxSizing: 'border-box',
};

export default MainMenu;
