import React, { useState } from 'react';
import axios from "axios";
import './Styles.css';

function LogIn({ setUserID, userID }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const bodyStyle = 'bodyStyle';

    const handleInputChangeUsername = (e) => { setUsername(e.target.value); };
    const handleInputChangePassword = (e) => { setPassword(e.target.value); };
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3001/login', {
                username,
                password,
            });
            alert(response.data['message']);
            if (response.data['success']) {
                setUserID(response.data['userid']);
                window.location.href = '/';
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div className={bodyStyle}>
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
                <div>
                    <button type="submit" className="myButton">
                        Log In
                    </button>
                </div>
            </form>
        </div>
    );
}

const textStyle = {
    fontSize: '1vw',
    color: '#67f',
};

const textBoxStyle = {
    width: '15vw',
    height: '2vw',
    backgroundColor: '#333',
    fontSize: '1vw',
    marginLeft: '1vw',
    marginBottom: '1vw',
};

export default LogIn;
