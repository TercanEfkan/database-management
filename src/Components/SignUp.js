import React, { useState } from 'react';
import axios from 'axios'; // Import axios

function SignUp() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [playername, setPlayername] = useState('');
    const handleInputChangeUsername = (e) => {
        setUsername(e.target.value);
    };
    const handleInputChangeplayername = (e) => {
        setPlayername(e.target.value);
    };
    const handleInputChangePassword = (e) => {
        setPassword(e.target.value);
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Send a POST request to your backend
            const response = await axios.post('http://localhost:3001/signup', {
                username,
                password,
                playername,
            });

            console.log('Response:', response.data);
            // Handle success, update UI or show a success message
        } catch (error) {
            console.error('Error:', error);
            // Handle error, show an error message to the user
        }
    };

    return (
        <div className="signup-container">
            <h2 style={textStyle}>Sign Up</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label style={textStyle}>
                        First Name:
                        <input
                            type="text"
                            value={playername}
                            placeholder="Enter your first name"
                            style={textBoxStyle}
                            onChange={handleInputChangeplayername}
                        />
                    </label>
                </div>
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
                        Sign Up
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
    width: '22vw',
    height: '2vw',
    textDecoration: 'none',
    marginBottom: '5px',
    color: '#000000',
    background: 'linear-gradient(to right, #202020, #404040)',
};

export default SignUp;
