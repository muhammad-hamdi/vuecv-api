const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const routes = require('./routes/api');

const jwt = require('jsonwebtoken');
const config = require('./config');


const app = express();
const port = process.env.port || 3000;


mongoose.connect(config.database);

mongoose.Promise = global.Promise;

app.set('secretToken', config.secret);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/api',routes);

app.listen(port, function(){
  console.log('Server listening on port ' + port);
})
