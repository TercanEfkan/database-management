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

            <div className="block-text">
                <span className={purple}>B</span>
                <span className={green}>L</span>
                <span className={yellow}>O</span>
                <span className={orange}>C</span>
                <span className={red}>K</span>
                <span className={blue}>S</span>
            </div>

                <a className={myButton} href="/Game">
                    Play
                </a>

                <a className={myButton} href="/leaderBoard">
                    LeaderBoard
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
