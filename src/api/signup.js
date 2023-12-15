const { sql, poolPromise } = require('./dbo');

module.exports = async (req, res) => {
    try {
        const { username, password, playername } = req.body;

        const pool = await poolPromise;
        const request = pool.request();

        const countResult = await request.query(`SELECT COUNT(*) FROM dbo.Login WHERE Username = '${username}'`);
        console.log("Amount of rows matched: " + countResult.recordset[0]['']);

        if (countResult.recordset[0][''] === 0) {
            const id = Math.floor(Math.random() * 2147483646) + 1;
            await request.query(`INSERT INTO dbo.Login (Username, UserID, Password, Firstname) VALUES ('${username}', '${id}', '${password}', '${playername}')`);

            res.status(201).json({ message: 'Sign-up successful', success: true });
        } else {
            console.error('Error: username unavailable');
            res.status(201).json({ message: 'Username is unavailable', success: false });
        }
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
