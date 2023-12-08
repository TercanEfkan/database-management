import React from 'react';
const Profile = () => {
    return (
        <div style={middleStyle}>
            <h1>Player ID</h1>
            <div style={container}>
                <div style={titleStyle}>
                    <p style={pStyle}>A:</p>
                </div>
                <div style={informationTextStyle}>
                    <p style={pStyle} >AAAAAAAAAAAAAAAAAAAAAAA AAAAAAAAAAA AAAAAAAAAA</p>
                </div>
            </div>

            <div style={container}>
                <div style={titleStyle}>
                    <p style={pStyle}>B:</p>
                </div>
                <div style={informationTextStyle}>
                    <p style={pStyle} >BBBBBBBBBBBBBB BBBBBBBBBBB BBBBBBBBB</p>
                </div>
            </div>

            <div style={container}>
                <div style={titleStyle}>
                    <p style={pStyle}>C:</p>
                </div>
                <div style={informationTextStyle}>
                    <p style={pStyle} >CCCCCCCCCCCC CCCCCCCC CCCCCCCCCCCCCCCCCC CCCCCC</p>
                </div>
            </div>

            <div style={container}>
                <div style={titleStyle}>
                    <p style={pStyle}>D:</p>
                </div>
                <div style={informationTextStyle}>
                    <p style={pStyle} >DDDDDDDDDDDDD DDDDDDDDDDD DDDDDDDDDD DDDDDDDDDDDDDD</p>
                </div>
            </div>
        </div>
    );
};

const articleNumber = 4
const pStyle={ // textler kutunun ortasından yazmaya başlıyordu. soldan başlaması için yapıldı
    float: 'left',
};
const titleStyle ={
    backgroundColor: '#383838',
    width: '33%', // kutunun kapladığı alan paddinge dikkat değişirse buda değişmeli
    height: '90%',
    float: 'left',
    padding: '3px', // width i bozuyor değiştirirken dikkat
};

const informationTextStyle ={
    backgroundColor: '#4F4F4F',
    width: '64%', // kutunun kapladığı alan paddinge dikkat değişirse buda değişmeli
    height: '90%',
    float: 'left',
    padding: '3px', // width i bozuyor değiştirirken dikkat
};

const container ={ //
    backgroundColor: '#333',
    height: (300/articleNumber),
};
const middleStyle = {

    padding: '10px',
    margin: '0 auto', // x eksenine göre ortalar
    width: '45vw',
    height: '30vw',
    backgroundColor: '#232323',
    color: '#000000',
    fontSize: '1rem',
    border: '10px solid grey',
};

export default Profile;
