import React from 'react';

const MainMenu = () => {

    const kiracLink = 'https://www.linkedin.com/in/efkan-k%C4%B1ra%C3%A7-tercan-22a063224/';
    const enesLink = 'https://www.linkedin.com/in/enes-karakulak-a7a580238/';
    const efeLink = 'https://www.linkedin.com/in/rasim-efe-sazci-31b0b7222/';
    const boranLink = 'https://www.linkedin.com/in/boran-haznedar-b41471227/';

    const kiracImg = "https://media.licdn.com/dms/image/D4D03AQGm0eLlN7FY8g/profile-displayphoto-shrink_800_800/0/1679133479321?e=1707350400&v=beta&t=tGs9VPgsqHHkqo6pIK0mWKC_eBCzDXc1YX_PvfIKVaQ"
    const enesImg = "https://media.licdn.com/dms/image/C4D03AQG4SbZ4vvxqwQ/profile-displayphoto-shrink_800_800/0/1653583134303?e=1707350400&v=beta&t=QHaT0FzH5JWDedzpmRNjau8X5yVBumADqllaxRbW7m4"
    const efeImg = "https://media.licdn.com/dms/image/C4E03AQHOAJcJ8Ii35Q/profile-displayphoto-shrink_800_800/0/1635867375007?e=1707350400&v=beta&t=0_TR7uEPqGDfYLdkNVghL_DmfiArdylnLVN0ksRboFc"
    const boranImg = "https://media.licdn.com/dms/image/D4D03AQGm0eLlN7FY8g/profile-displayphoto-shrink_800_800/0/1679133479321?e=1707350400&v=beta&t=tGs9VPgsqHHkqo6pIK0mWKC_eBCzDXc1YX_PvfIKVaQ"


    return (

        <div>
            <div style={containerStyle}>
                <div style={imgBoxStyle}>
                    <a href={kiracLink} target="_blank"> <img src={kiracImg} alt="kirac" style={imageStyle}/></a>
                </div>
                <div style={informationBoxStyle}>
                    <h1 style={h1Style}>Efkan Kıraç Tercan</h1>
                    <p> Efkan Kıraç Tercan, Developper and team manager of this website. </p>
                </div>
            </div>

            <div style={containerStyle}>
                <div style={imgBoxStyle}>
                    <a href={enesLink} target="_blank"> <img src={enesImg} alt="enes" style={imageStyle}/></a>
                </div>
                <div style={informationBoxStyle}>
                    <h1 style={h1Style}>Unknown</h1>
                    <p></p>
                </div>
            </div>

            <div style={containerStyle}>
                <div style={imgBoxStyle}>
                    <a href={efeLink} target="_blank"> <img src={efeImg} alt="efe" style={imageStyle}/></a>
                </div>
                <div style={informationBoxStyle}>
                    <h1 style={h1Style}>Rasim Efe Sazcı</h1>
                    <p>Rasim Efe Sazcı's influence extends beyond the digital realm; he actively engages in
                        community-building initiatives and shares his knowledge generously. Whether guiding
                        fellow gamers or enlightening others with his vast knowledge, he is a true embodiment
                        of a modern Renaissance individual.</p>
                </div>
            </div>

            <div style={containerStyle}>
                <div style={imgBoxStyle}>
                    <a href={boranLink} target="_blank"> <img src={boranImg} alt="boran" style={imageStyle}/></a>
                </div>
                <div style={informationBoxStyle}>
                    <h1 style={h1Style}>Boran Haznedar</h1>
                    <p>Boran Haznedar's allure extends beyond the tech world into the realms of a gourmet and wine aficionado.
                        This unique combination makes him a figure of interest for both artificial intelligence enthusiasts
                        and wine lovers alike.</p>
                </div>
            </div>
        </div>

    );
};


const containerStyle= {
    width: '100%',
    height: '100px',
};

const imgBoxStyle = {
    width: '5%',
    float: 'left',
};

const imageStyle = {
    width: '100%',
    height: 'auto',
    borderRadius: '50%'
};

const informationBoxStyle = {
    width: '80%',
    height: '100%',
    margin: '0 auto'
};

const h1Style = {
    textDecoration: 'underline',
    fontWeight: 'bold',
    fontsize: '10px', // Her nedense büyüklüğü ayarlamama izin vermedi
};



export default MainMenu;
