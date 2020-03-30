const express = require('express');
const routes = require('./routes/routes');
const cors = require('cors');

const app = express();
const connection = require('./database/connection')
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(routes)

app.use(cors());






app.listen(3333, () => {
  console.log('Server listening on port 3333')
});