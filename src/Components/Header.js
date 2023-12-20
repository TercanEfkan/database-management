import React from 'react';
import './Styles.css';
const Header = ({userID}) => {
    console.log(userID + " header");
    // Kullanılacak Style lar atandı.
    const headerStyle = 'headerStyle';
    const titleStyle = 'titleStyle';
    const myButton = 'myButton';
    const headerButtons = 'headerButtons';

    return (

        <header className={headerStyle}>
            {userID===-1 ? ( // Login yapılmamış durum
                <h1 className={titleStyle}>BLOCKS</h1>
            ) : ( //Login yapılmış durum
                <h1 className={titleStyle}>{userID}</h1>
            )}
            <div className={headerButtons}>

                <a className={myButton} href="/">
                    Main Menu
                </a>

                {userID===-1 ? ( // Login yapılmamış durum
                    <a className={myButton} href="/Login" >
                        Log In
                    </a>
                ) : ( //Login yapılmış durum
                    <a className={myButton} href="/" onClick={()=> {localStorage.setItem('userID', JSON.stringify(-1)); window.location.href = '/';}}>
                            Log Out
                    </a>
                )}

                {userID===-1 ? ( // Login yapılmamış durum
                    <a className={myButton} href="/SignUp">
                        Sign Up
                    </a>
                ): null }

                <a className={myButton} href="/about">
                        About Us
                </a>
                <a className={myButton} href="/minesweeper">
                    Minesweeper
                </a>
            </div>
        </header>
    );
};
export default Header;
