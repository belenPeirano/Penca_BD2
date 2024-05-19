const express = require('express');
const connectionDB = require('./db/db.conn');
const cors = require('cors');

const app = express();
app.use(cors());

app.listen(3000, () => {
  console.log('listening on port 3000');
});

app.get('/usuarios', (req, res) => {
  connectionDB.query('SELECT * FROM usuario', (err, rows) => {
    if (err) throw err;
    res.send(rows);
  });
});
