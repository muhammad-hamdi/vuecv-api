const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const morgan = require('morgan');

const skills = require('./routes/skills');
const portfolio = require('./routes/portfolio');
const user = require('./routes/user');

const jwt = require('jsonwebtoken');
const config = require('./config');


const app = express();
const port = process.env.port || 3000;


mongoose.connect(config.database);

mongoose.Promise = global.Promise;

app.set('secret', config.secret);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(morgan('dev'));


app.use('/api', skills);
app.use('/api', portfolio);
app.use('/api', user);

app.listen(port, function(){
  console.log('Server listening on port ' + port);
})
