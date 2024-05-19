const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost:3306',
    user: 'root',
    password: 'root',
    database: 'pencabdii'
});

connection.connect((err) => {
    if (err) {
        console.log('Error connecting to Db');
        return;
    }
    console.log('Connection established');
});

module.exports = connection;
