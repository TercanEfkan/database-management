import React from 'react';
const Profile = () => {
    return (
        <div style={middleStyle}>
            <h1>USERID</h1>
            <div style={divStyle}>
                <p >User Name:</p>
            </div>
            <div style={divStyle}>
            <p >Date Joined:</p>
            </div>
            <div style={{ ...divStyle, borderBottom: '2px solid black'}} >
                <p >Placement:</p>
            </div>


        </div>
    );
};
const divStyle = {
    width: '44vw',
    height: '5vw',
    backgroundColor: '#433',
    borderTop: '2px solid black',
    borderLeft: '2px solid black',
    borderRight: '2px solid black',
};
const middleStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginLeft: '30vw', // Shift 50px to the left
    width: '45vw',
    height: '30vw',
    backgroundColor: '#333',
    color: '#000000',
    fontSize: '1rem',
    border: '10px solid grey',
    boxSizing: 'border-box',
};

export default Profile;
