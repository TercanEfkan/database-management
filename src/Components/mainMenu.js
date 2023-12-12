import React from 'react';
const MainMenu = ({userID}) => {
    const gameLink = () => {
        window.location.href = '/game';
    };
    const leaderboardLink = () => {
        window.location.href = '/leaderboard';
    };
    const profileLink = () => {
        window.location.href = '/profile';
    };
    const signupLink = () => {
        window.location.href = '/signup';
    };
    const loginLink = () => {
        window.location.href = '/login';
    };
    let text;
    if (userID === -1){
        text = 'Log In';
    }else{
        text = 'Log Out';
    }
    return (
        <div style={middleStyle}>
            <button style = {buttonStyle} onClick={gameLink} >Play</button>
            <button style = {buttonStyle} onClick={leaderboardLink}>LeaderBoard</button>
            <button style = {buttonStyle} onClick={profileLink} >Profile</button>
            <button style = {buttonStyle} onClick={loginLink} >{text}</button>
            <button style = {buttonStyle} onClick={signupLink} >Sign Up</button>

        </div>
    );
};
const buttonStyle = {

    width: '30vw',
    height: '3vw',
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
