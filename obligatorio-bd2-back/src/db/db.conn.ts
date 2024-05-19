const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost',
    port: '3306',
    user: 'root',
    password: 'root',
    database: 'pencabdii',
    multipleStatements: true
});

connection.connect((err) => {
    if (err) {
        console.log('Error connecting to Db');
        console.error(err);
        return;
    }
    console.log('Connection established');
});

module.exports = connection;
