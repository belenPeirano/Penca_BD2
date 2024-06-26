"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mysql = require('mysql2');
const connection = mysql.createConnection({
    host: 'database',
    port: 3306,
    user: 'sebacapo',
    password: 'sebacapo123',
    database: 'pencabdii',
    multipleStatements: true
});
exports.default = connection;
//# sourceMappingURL=db.conn.js.map