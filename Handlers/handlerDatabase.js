const mysql = require('mysql');

module.exports = async () => {

    const db = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'root',
        database: 'deltabot'
    });

    return db;
}