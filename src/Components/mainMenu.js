import React from 'react';
import './Styles.css';
const MainMenu = ({userID}) => {

    const bodyStyle = 'bodyStyle'
    const myButton = 'myButton'

    return (
        <div className={bodyStyle}>

            <p className="block-text">
                <span style={{color: 'purple'}}>G</span>
                <span style={{color: 'green'}}>A</span>
                <span style={{color: 'yellow'}}>M</span>
                <span style={{color: 'orange'}}>E</span>
                <span> </span>
                <span style={{color: 'red'}}>S</span>
                <span style={{color: 'blue'}}>P</span>
                <span style={{color: 'purple'}}>A</span>
                <span style={{color: 'green'}}>C</span>
                <span style={{color: 'orange'}}>E</span>
            </p>

            <a className={myButton} href="/Game">
                Blocks
            </a>

            <a className={myButton} href="/MineSweeper">
                Mine Sweeper
            </a>

            <a className={myButton} href="/leaderBoard">
                Leader Board
            </a>

            {userID !== -1 ? (
                <a className={myButton} href="/Profile">
                    Profile
                </a>
            ) : null}
        </div>
    );
};

export default MainMenu;
