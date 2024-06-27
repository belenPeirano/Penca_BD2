const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'database',
    port: 3306,
    user: 'sebacapo',
    password: 'sebacapo123',
    database: 'pencabdii',
    multipleStatements: true
});



export default connection;
