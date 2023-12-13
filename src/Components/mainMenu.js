import React from 'react';
import './Styles.css';
const MainMenu = ({userID}) => {

    const menuBodyStyle = 'menuBodyStyle'
    const myButton = 'myButton'
    const red = 'red';
    const blue = 'blue';
    const green = 'green';
    const yellow = 'yellow';
    const purple = 'purple';
    const orange = 'orange';

    return (
        <div className={menuBodyStyle}>

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
