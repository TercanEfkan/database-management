const express = require('express');
const { sql, poolPromise } = require('./dbo'); // Import the database connection
const app = express();
const PORT = process.env.PORT || 3001;
var cors = require('cors')
const {useState} = require("react");
app.use(express.json());

// Your routes will go here

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
app.use(cors());
app.post('/signup', async (req, res) => {
    try {
        // Access incoming data from req.body
        const { username, password, playername } = req.body;
        console.log(username, password, playername);
        // Use your database connection to insert data into your database
        const pool = await poolPromise;
        const request = pool.request();
        // Example query to insert data into a table
        const countResult = await request.query(`SELECT COUNT(*) FROM dbo.Login WHERE Username = '${username}'`);
        console.log("amount of rows matched: " + countResult.recordset[0]['']);

        if (countResult.recordset[0][''] === 0){
            const id = Math.floor(Math.random() * 2147483646) + 1;
            await request.query(`INSERT INTO dbo.Login (Username, UserID, Password, Firstname) VALUES ('${username}', '${id}', '${password}', '${playername}')`);

            res.status(201).json({ message: 'Sign-up successful', success: true });
        }
        else{
            console.error('Error: username unavailable')
            res.status(201).json({ message: 'Username is unavailable', success: false });
        }

    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});


app.post('/login', async (req, res) => {
    try {
        // Access incoming data from req.body
        const { username, password} = req.body;
        console.log(username, password);
        // Use your database connection to insert data into your database
        const pool = await poolPromise;
        const request = pool.request();
        // Example query to insert data into a table
        const countResult = await request.query(`SELECT * FROM dbo.Login WHERE Username = '${username}' AND Password = '${password}'`);

        if (countResult.recordset.length === 1) {
            console.error('Login is successful' + countResult.recordset[0]['UserID'])
            res.status(201).json({ message: 'Log-in successful', username: username,success: true, userid: countResult.recordset[0]['UserID']});
        }
        else{
            console.error('Error: username or password is wrong')
            res.status(201).json({ message: 'Wrong password or username', success: false });
        }

    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.post('/post-game', async (req, res) => {
    try {
        // Access incoming data from req.body
        const { userID, score, timeSpent} = req.body;
        console.log(userID, score, timeSpent);
        // Use your database connection to insert data into your database
        const pool = await poolPromise;
        const request = pool.request();
        // Example query to insert data into a table
        /*const countResult = await request.query(`SELECT * FROM dbo.Login WHERE Username = '${username}' AND Password = '${password}'`);

        if (countResult.recordset.length === 1) {
            console.error('Login is successful' + countResult.recordset[0]['UserID'])
            res.status(201).json({ message: 'Log-in successful', username: username,success: true, userid: countResult.recordset[0]['UserID']});
        }
        else{
            console.error('Error: username or password is wrong')
            res.status(201).json({ message: 'Wrong password or username', success: false });
        }*/
        const highestScore = await request.query(`SELECT * FROM dbo.HighScores WHERE UserID = '${userID}'`);
        if (highestScore.recordset.length > 0) {
            const existingHighestScore = parseInt(highestScore.recordset[0]['Score']);
            if(score > existingHighestScore){
                await request.query(`UPDATE dbo.HighScores SET Score = '${score}', GameMode = '1', Time = '${timeSpent}' WHERE UserID = '${userID}'`);
            }
        }
        else{
            await request.query(`INSERT INTO dbo.HighScores (GameMode, UserID, Time, Score) VALUES ('1', '${userID}', '${timeSpent}', '${score}')`);
        }

    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
app.post('/leader-board', async (req, res) => {
    try {
        const pool = await poolPromise;
        const request = pool.request();
        // Example query to insert data into a table
        const topSevenRequest = await request.query(`SELECT TOP 7 UserID, Score  FROM dbo.HighScores ORDER BY Score DESC`);
        const topSevenInfo = [];
        if (topSevenRequest.recordset.length === 7) {
            for (let i = 0; i< 7; i++ ){
                const indexUID = topSevenRequest.recordset[i]['UserID'];
                const uid = await request.query(`SELECT Username FROM dbo.Login WHERE UserID ='${indexUID}'`);
                const indexUsername = uid.recordset[0]['Username'];
                const uinfo = {username: indexUsername, score: topSevenRequest.recordset[i]['Score']};
                topSevenInfo.push(uinfo);
            }
            console.log(topSevenInfo);
            res.status(201).json(topSevenInfo);
        }

    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
app.post('/profile', async (req, res) => {
    try {

        const userid = req.body.userid;

        console.log('userid: ' + userid + ' Type:' + typeof(userid) );
        if (parseInt(userid) !== -1) {
            const pool = await poolPromise;
            const request = pool.request();

            const requestData = await request.query(`SELECT Username, FirstName FROM dbo.Login WHERE UserID = ${userid}`);
            const username = requestData.recordset[0]['Username'];
            const firstname = requestData.recordset[0]['FirstName'];
            const requestHS = await request.query(`SELECT Score FROM dbo.HighScores WHERE UserID = ${userid}`);
            const score = (requestHS.recordset.length > 0) ?  requestHS.recordset[0]['Score'] : 0;

            const data = {score: score, username: username, firstname: firstname, success: true};
            console.log(data);
            res.status(201).json(data);
        }
        else{
            res.status(201).json({success: false, message: 'You are not logged in'});
        }


    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});