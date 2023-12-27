import React from 'react';
import './Styles.css';
const MainMenu = ({userID}) => {

    const bodyStyle = 'bodyStyle'
    const myButton = 'myButton'
    const red = 'redColor';
    const blue = 'blueColor';
    const green = 'greenColor';
    const yellow = 'yellowColor';
    const purple = 'purpleColor';
    const orange = 'orangeColor';

    return (
        <div className={bodyStyle}>

            <p className="block-text">
                <span className={purple}>G</span>
                <span className={green}>A</span>
                <span className={yellow}>M</span>
                <span className={orange}>E</span>
                <span> </span>
                <span className={red}>S</span>
                <span className={blue}>P</span>
                <span className={purple}>A</span>
                <span className={green}>C</span>
                <span className={orange}>E</span>
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
