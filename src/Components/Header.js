import React from 'react';
import './Styles.css';
const Header = ({userID}) => {
    console.log(userID + " header");
    // Kullanılacak Style lar atandı.
    const headerStyle = 'headerStyle';
    const siteNameStyle = 'site-name-style';
    const myButton = 'myButton';
    const headerButtons = 'headerButtons';
    const IDStyle = 'id-style'

    return (

        <header className={headerStyle}>
            <h1>
                <a href="/" id={siteNameStyle}>
                    GAME SPACE
                </a>
            </h1>
            {userID===1 ? ( // Login yapılmamış durum
                <p id={IDStyle}>User ID: {userID}</p>
            ) : null}
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
            </div>
        </header>
    );
};
export default Header;
