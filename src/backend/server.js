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
        const countResult = await request.query(`SELECT COUNT(*) AS rowCount FROM dbo.Player WHERE UserID LIKE '${username}'`);
        console.log('Row count:', countResult.recordset[0].rowCount); // Log the row count
        await request.query(`INSERT INTO dbo.Player (UserID, Password, PlayerName) VALUES ('${username}', '${password}', '${playername}')`);

        res.status(201).json({ message: 'Sign-up successful' });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
