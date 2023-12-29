import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Styles.css';

const LeaderBoard = () => {
    const [leaders, setLeaders] = useState([]); // Using state to manage leaders
    // Fetch data function
    const fetchData = async () => {
        try {
            const response = await axios.post('http://localhost:3001/leader-board', {});
            setLeaders(response.data); // Update leaders state with fetched data
        } catch (error) {
            console.error('Error:', error);
            // Handle error, show an error message to the user
        }
    };

    // useEffect to fetch data when the component mounts
    useEffect(() => {
        fetchData(); // Fetch data when component mounts
    }, []); // Empty dependency array ensures it runs only once (on mount)

    return (
        <div className='bodyStyle' style={middleStyle}>
            <h1>LeaderBoard</h1>
            {/* Render leaders data */}
            {leaders.map((leader, index) => (
                <div
                    key={index}
                    style={{
                        ...informationTextStyle,
                        borderBottom: index === leaders.length - 1 ? '0.1vw solid red' : '0px',
                    }}
                >
                    {leader.username} : {leader.score}
                </div>
            ))}
        </div>
    );

};

// Styling objects
const informationTextStyle = {
    width: '100%',
    height: '10%',
    float: 'left',
    border: '0.1vw solid red',
    borderBottom: '0px',
};

const middleStyle = {
    padding: '1vw',
    margin: '0 auto',
    width: '45vw',
    height: '60vh',
    backgroundColor: '#232323',
    color: '#000000',
    fontSize: '1vw',
    border: '0.7vw solid grey',
};

export default LeaderBoard;
