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
        const countResult = await request.query(`SELECT COUNT(*) FROM dbo.Player WHERE UserID = '${username}'`);
        console.log("amount of rows matched: " + countResult.recordset[0]['']);

        if (countResult.recordset[0][''] === 0){
            await request.query(`INSERT INTO dbo.Player (UserID, Password, PlayerName) VALUES ('${username}', '${password}', '${playername}')`);

            res.status(201).json({ message: 'Sign-up successful' });
        }
        else{
            console.error('Error: username unavailable')
            res.status(201).json({ message: 'Username is unavailable' });
        }

    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
