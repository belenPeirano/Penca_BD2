const express = require('express');
const connection = require('./src/db/db.conn');

const app = express();

app.listen(3000, () => {
  console.log('listening on port 3000');
});

app.get('/', (req, res) => {
  res.send('Hello World');
});


app.get('/usuarios', (req, res) => {
  connection.query('SELECT * FROM usuario', (err, rows) => {
    if (err) throw err;
    res.send(rows);
  });
});