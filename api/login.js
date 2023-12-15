const { sql, poolPromise } = require('./dbo');

module.exports = async (req, res) => {
    try {
        const { username, password } = req.body;

        const pool = await poolPromise;
        const request = pool.request();

        const countResult = await request.query(`SELECT * FROM dbo.Login WHERE Username = '${username}' AND Password = '${password}'`);

        if (countResult.recordset.length === 1) {
            console.error('Login is successful' + countResult.recordset[0]['UserID']);
            res.status(201).json({ message: 'Log-in successful', username: username, success: true, userid: countResult.recordset[0]['UserID'] });
        } else {
            console.error('Error: username or password is wrong');
            res.status(201).json({ message: 'Wrong password or username', success: false });
        }
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
