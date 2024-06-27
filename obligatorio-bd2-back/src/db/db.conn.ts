const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'database',
    port: 3306,
    user: 'root',
    password: 'root1234',
    database: 'pencabdii',
    multipleStatements: true
});



export default connection;
