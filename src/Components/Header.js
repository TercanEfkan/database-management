import React from 'react'; // Import React
import './Styles.css'; // Import CSS file for styling

// Define the Header component
const Header = ({ userID }) => {
    // Log user ID to the console with "header" text
    console.log(userID + " header");

    // Define CSS classes
    const headerStyle = 'headerStyle';
    const siteNameStyle = 'site-name-style';
    const myButton = 'myButton';
    const headerButtons = 'headerButtons';
    const IDStyle = 'id-style';

    return (
        // Render the header section with JSX
        <header className={headerStyle}>
            <h1>
                <a href="/" id={siteNameStyle}>
                    GAME SPACE
                </a>
            </h1>
            {/* Conditionally render user ID if it's not -1 */}
            {userID !== -1 ? (
                <p id={IDStyle}>User ID: {userID}</p>
            ) : null}
            <div className={headerButtons}>
                {/* Render different buttons based on user ID */}
                <a className={myButton} href="/">
                    Main Menu
                </a>
                {/* Conditional rendering for Log In/Log Out and Sign Up buttons */}
                {userID === -1 ? (
                    <a className={myButton} href="/Login">
                        Log In
                    </a>
                ) : (
                    <a className={myButton} href="/" onClick={() => { localStorage.setItem('userID', JSON.stringify(-1)); window.location.href = '/'; }}>
                        Log Out
                    </a>
                )}
                {userID === -1 ? (
                    <a className={myButton} href="/SignUp">
                        Sign Up
                    </a>
                ) : null}
                {/* Always render About Us button */}
                <a className={myButton} href="/about">
                    About Us
                </a>
            </div>
        </header>
    );
};

// Export the Header component as default
export default Header;
