import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Game from './Game';
const leaderBoard = () => {
    return (
        <div style={middleStyle}>
            
        </div>
    );
};

const middleStyle = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 'calc(50vw - 50px)', // Shift 50px to the left
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

export default leaderBoard;
