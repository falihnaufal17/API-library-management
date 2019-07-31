require('dotenv/config');
const mysql = require('mysql');

const connection = mysql.createConnection({
    host: process.env.DB_HOST || "remotemysql.com",
    user: process.env.DB_USER || "eLQnwUDQz3",
    password: process.env.DB_PASS || "nSyJvnbLGm",
    database: process.env.DB_NAME || "eLQnwUDQz3",
});

module.exports = connection;