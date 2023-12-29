import React, { useEffect, useState } from 'react';
import axios from "axios";

const Profile = ({ userID }) => {
    const [profile, setProfile] = useState([]);

    const fetchData = async () => {
        try {
            const response = await axios.post('http://localhost:3001/profile', { userid: userID });
            setProfile(response.data);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    if (profile['success']) {
        return (
            <div className='bodyStyle'>
                <h1 style={{ color: '#67F', fontSize: '2vw' }}>Username: {profile['username']}</h1>
                <div style={divStyle}>
                    User ID: {userID}
                </div>
                <div style={divStyle}>
                    Player Name: {profile['firstname']}
                </div>
                <div style={{ ...divStyle, borderBottom: '1px solid red' }}>
                    Highest Score: {profile['score']}
                </div>
            </div>
        );
    } else {
        return (
            <div className='bodyStyle'>
                <div style={{ ...divStyle, border: '0px' }}>
                    You are not logged in!
                </div>
            </div>
        );
    }
};

const divStyle = {
    fontSize: '1.5vw',
    color: '#67f',
    width: '80%',
    border: '1px solid red',
    borderBottom: '0',
    display: 'flex',
    marginLeft: '1vw'
};

export default Profile;
