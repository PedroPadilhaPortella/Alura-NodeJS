const msyql = require('mysql2');

const connection = msyql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'root',
    database: 'biblioteca'
});

module.exports = connection