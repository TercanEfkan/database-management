import React, { useState } from 'react';
import axios from 'axios'; // Import axios
import './Styles.css';

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
            const usBool = isAlphanumeric(username);
            const passBool = isAlphanumericWithSymbols(password);
            const nameBool = isAlphabetic(playername);
            if(nameBool && playername.length <= 10){
                if(usBool && username.length <= 12 && username.length >= 6){
                    if(passBool && password.length <= 12 && password.length >= 6){
                        // Send a POST request to your backend

                        const response = await axios.post('http://localhost:3001/signup', {
                            username,
                            password,
                            playername,
                        });
                        alert(response.data['message'] + response.data['success']);
                        if(response.data['success']) window.location.href = '/';

                    }
                    else{
                        alert("Password can only contain the characters of a-z, A-Z and 0-9 with the maximum length of 12 and min length of 6");
                    }
                }
                else{
                    alert("Username can only contain the characters of a-z, A-Z, 0-9, !@#$^&()+=<>.,:;{}| and space with the maximum length of 12 and min length of 6");
                }
            }else{
                alert("Firstname can only contain the characters of a-z and A-Z with the maximum length of 10");
            }

        } catch (error) {
            console.error('Error:', error);
            // Handle error, show an error message to the user
        }
    };

    return (
        <div className="bodyStyle">
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
                    <button type="submit" className="myButton">
                        Sign Up
                    </button>
                </div>
            </form>
        </div>
    );
}
function isAlphanumeric(word) {
    const alphanumericRegex = /^[a-zA-Z0-9]+$/;
    return alphanumericRegex.test(word);
}
function isAlphabetic(word) {
    const alphanumericRegex = /^[a-zA-Z]+$/;
    return alphanumericRegex.test(word);
}
function isAlphanumericWithSymbols(word) {
    const alphanumericWithSymbols = /^[a-zA-Z0-9!@#$^&()+=<>.,:;{}|\s]+$/;
    return alphanumericWithSymbols.test(word);
}

const textStyle = {
    fontSize: '1.5em',
    color: '#67f',
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
