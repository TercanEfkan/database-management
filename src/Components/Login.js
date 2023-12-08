import React, { useState } from 'react';

function SignUp() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const handleInputChangeUsername = (e) => {
        setUsername(e.target.value);
    };
    const handleInputChangePassword = (e) => {
        setPassword(e.target.value);
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission logic here
        console.log('Username:', username);
        // You can perform further actions like API calls or state updates here
    };

    return (
        <div className="signup-container">
            <h2 style={textStyle}>Log In</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label style={textStyle}>
                        Username:
                        <input
                            type="text"
                            value={username}
                            placeholder="Enter your username"
                            style={textBoxStyle}
                            onChange={handleInputChangeUsername}
                        />
                    </label>
                </div>
                <div>
                    <label style={textStyle}>
                        Password:
                        <input
                            type="password"
                            value={password}
                            placeholder="Enter your password"
                            style={textBoxStyle}
                            onChange={handleInputChangePassword}
                        />
                    </label>
                </div>
                <div> {/* Container for stacking elements */}
                    <button type="submit" style={buttonStyle}>
                        Log In
                    </button>
                </div>
            </form>
        </div>
    );
}

const textStyle = {
    fontSize: '1.5em',
    color: '#000',
};

const textBoxStyle = {
    width: '15vw',
    height: '2vw',
    backgroundColor: '#333',
    fontSize: '1.5em',
    marginLeft: '1vw',
    marginBottom: '1vw',
};

const buttonStyle = {
    fontSize: '1.5em',
    width: '22vw',
    height: '2vw',
    textDecoration: 'none',
    marginBottom: '5px',
    color: '#000000',
    background: 'linear-gradient(to right, #202020, #404040)',
};

export default SignUp;
