import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Game from './Game';
const MainMenu = () => {
    return (
        <div style={middleStyle}>
            <button>

            </button>
        </div>
    );
};

const middleStyle = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: '30vw', // Shift 50px to the left
    width: '45vw',
    height: '30vw',
    backgroundColor: '#FFFFFF',
    color: '#000000',
    fontSize: '1rem',
    border: '10px solid red',
    boxSizing: 'border-box',
};

const buttonStyle = {
    textDecoration: 'none',
    color: '#000000',
};

export default MainMenu;
