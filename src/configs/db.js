require('dotenv/config');
const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'remotemysql.com',
    user: 'eLQnwUDQz3',
    password: 'nSyJvnbLGm',
    database: 'eLQnwUDQz3',
});

module.exports = connection;