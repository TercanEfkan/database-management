import React from 'react';
import './Header.css';
const Header = ({userID}) => {
    console.log(userID + " header");

    // Kullanılacak Style lar atandı.
    const headerStyle = 'headerStyle';
    const titleStyle = 'titleStyle';
    const myButton = 'myButton';
    const headerButtons = 'headerButtons';

    return (

        <header className={headerStyle}>
            <h1 className={titleStyle}>{userID}</h1>
            <div className={headerButtons}>
                <div>
                    <a className={myButton} href="/">
                        Main Menu
                    </a>
                </div>
                <div>
                    {userID===-1 ? ( // Login yapılmamış durum
                        <a className={myButton} href="/Login">
                            Log In
                        </a>
                    ) : ( //Login yapılmış durum
                        <a className={myButton} href="/">
                            Log Out
                        </a>
                    )}
                </div>
                <div>
                    {userID===-1 ? ( // Login yapılmamış durum
                        <a className={myButton} href="/SignUp">
                            Sign Up
                        </a>
                    ):( //Login yapılmış durum
                       <p></p>
                    )
                    }
                </div>
                <div>
                    <a className={myButton} href="/about">
                        About Us
                    </a>
                </div>
            </div>
        </header>
    );
};
export default Header;
