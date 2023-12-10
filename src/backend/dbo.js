const sql = require('mssql');

const config = {
    server: 'labradordali.database.windows.net',
    database: 'labradordali',
    user: 'labradordali',
    password: '104146eK!',
    options: {
        encrypt: true, // For Azure SQL
        trustServerCertificate: false,
    },
};

const poolPromise = new sql.ConnectionPool(config)
    .connect()
    .then(pool => {
        console.log('Connected to the database');
        return pool;
    })
    .catch(err => console.error('Database connection failed', err));

module.exports = {
    sql,
    poolPromise,
};
