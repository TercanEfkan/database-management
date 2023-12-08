import React from 'react';
const Header = () => {
    return (
        <header style={headerStyle}>
            <h1 style={titleStyle}>BLOCKS</h1>
            <nav style={navStyle}>
                <ul style={ulStyle}>
                    <li style={liStyle}>
                        <a style={linkStyle} href="/mainmenu">
                            Main Menu
                        </a>
                    </li>
                    <li style={liStyle}>
                        <a style={linkStyle} href="/game">
                            Play
                        </a>
                    </li>
                    <li style={liStyle}>
                        <a style={linkStyle} href="/leaderboard">
                            Leader Board
                        </a>
                    </li>
                    <li style={liStyle}>
                        <a style={linkStyle} href="/about">
                            About Us
                        </a>
                    </li>
                </ul>
            </nav>
        </header>
    );
};

const headerStyle = {
    marginBottom: '10px',
    background: 'linear-gradient(to right, #252525, #555555)',
    color: 'white',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '0.7%',
    borderRadius: '10px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
};

const logoStyle = {
    margin: '1%',
    marginLeft: '1%',
};

const logoImageStyle = {
    width: '150px',
    height: '80px',
    borderRadius: '15px',
    display: 'block', // Add this line to set the initial display property
};

const titleStyle = {
    margin: 0,
    padding: '10px 0',
    fontSize: '24px',
};

const navStyle = {
    listStyle: 'none',
    padding: 0,
};

const ulStyle = {
    display: 'flex',
    listStyle: 'none',
    margin: 0,
    justifyContent: 'center',
    alignItems: 'center',
    padding: '10px 0',
};

const linkStyle = {
    textTransform: 'uppercase',
    textDecoration: 'none',
    color: 'white',
    fontWeight: 'bold',
    fontSize: '16px',
};

const liStyle = {
    margin: '0 10px',
    position: 'relative',
    background: 'rgba(255, 255, 255, 0.1)',
    padding: '10px 20px',
    borderRadius: '10px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    transition: 'transform 0.3s',
};

// Define a media query to hide the logo on screens with a maximum width of 768px
const mediaQuery = `@media (max-width: 768px) {
    .logo {
        display: none;
    }
}`;

// Add the media query to your styles
logoImageStyle[mediaQuery] = {
    display: 'block',
};

export default Header;
