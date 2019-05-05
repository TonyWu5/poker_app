const express = require('express');
require('./database/mongoose');
const path = require('path');
const sessionRouter = require('./routes/session');

const app = express();
const port = 3000;

app.use(express.json());
app.use(sessionRouter);
app.use('/', express.static(path.join(__dirname, '../../frontend/public')));

app.listen(port, () => {
  console.log(`Connected on port ${port}`);
});