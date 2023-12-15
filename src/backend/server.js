const express = require('express');
const { sql, poolPromise } = require('./dbo'); // Import the database connection
const app = express();
const PORT = process.env.PORT || 3001;
var cors = require('cors')
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

app.post('/postgame', async (req, res) => {
    try {
    } catch (error) {

    }
});