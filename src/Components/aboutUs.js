import React from 'react';

const MainMenu = () => {
    const kiracLink = () => {
        window.location.href = 'https://www.linkedin.com/in/efkan-k%C4%B1ra%C3%A7-tercan-22a063224/';
    };
    const enesLink = () => {
        window.location.href = 'https://www.linkedin.com/in/enes-karakulak-a7a580238/';
    };
    const efeLink = () => {
        window.location.href = 'https://www.linkedin.com/in/rasim-efe-sazci-31b0b7222/';
    };
    const boranLink = () => {
        window.location.href = 'https://www.linkedin.com/in/boran-haznedar-b41471227/';
    };

    return (
        <div >
            <div style={containerStyle} onClick={kiracLink}>
                <p style={textStyle} >Kıraç</p>
                <img
                    src="https://media.licdn.com/dms/image/D4D03AQGm0eLlN7FY8g/profile-displayphoto-shrink_800_800/0/1679133479321?e=1707350400&v=beta&t=tGs9VPgsqHHkqo6pIK0mWKC_eBCzDXc1YX_PvfIKVaQ"
                    style={imageStyle}
                    alt="Profile"
                />
            </div>
            <div style={containerStyle} onClick={enesLink}>
                <p style={textStyle}>Enes</p>
                <img
                    src="https://media.licdn.com/dms/image/C4D03AQG4SbZ4vvxqwQ/profile-displayphoto-shrink_800_800/0/1653583134303?e=1707350400&v=beta&t=QHaT0FzH5JWDedzpmRNjau8X5yVBumADqllaxRbW7m4"
                    style={imageStyle}
                    alt="Profile"
                />
            </div>
            <div style={containerStyle} onClick={efeLink}>
                <p style={textStyle}>Efe</p>
                <img
                    src="https://media.licdn.com/dms/image/C4E03AQHOAJcJ8Ii35Q/profile-displayphoto-shrink_800_800/0/1635867375007?e=1707350400&v=beta&t=0_TR7uEPqGDfYLdkNVghL_DmfiArdylnLVN0ksRboFc"
                    style={imageStyle}
                    alt="Profile"
                />
            </div>
            <div style={containerStyle} onClick={boranLink}>
                <p style={textStyle}>Boran</p>
                <img
                    src="https://media.licdn.com/dms/image/D4D03AQGm0eLlN7FY8g/profile-displayphoto-shrink_800_800/0/1679133479321?e=1707350400&v=beta&t=tGs9VPgsqHHkqo6pIK0mWKC_eBCzDXc1YX_PvfIKVaQ"
                    style={imageStyle}
                    alt="Profile"
                />
            </div>
        </div>
    );
};

const containerStyle = {
    position: 'relative',
    marginLeft: '4vw',
    marginTop: '5vw',
    width: '5vw',
};

const textStyle = {
    position: 'absolute',
    top: '50%', // Adjust as needed to position the text vertically
    left: '50%', // Adjust as needed to position the text horizontally
    transform: 'translate(-50%, -50%)',
    zIndex: 1,
    color: '#ffffff',
    fontSize: '1rem',
};

const imageStyle = {
    width: '100%',
    height: 'auto',
    borderRadius: '50%',
};

export default MainMenu;
