"use strict";
const express = require('express');
const connectionDB = require('./db/db.conn');
const app = express();
app.listen(3000, () => {
    console.log('listening on port 3000');
});
app.get('/usuarios', (req, res) => {
    connectionDB.query('SELECT * FROM usuario', (err, rows) => {
        if (err)
            throw err;
        res.send(rows);
    });
});
//# sourceMappingURL=index.js.map