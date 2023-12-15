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

async function connectDB() {
    try {
        const pool = await sql.connect(config);
        console.log('Connected to the database');
        return pool;
    } catch (error) {
        console.error('Database connection failed', error);
        throw error;
    }
}

module.exports = {
    sql,
    connectDB,
};
