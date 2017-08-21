const express = require('express');
const skills = require('./routes/skills');
const portfolio = require('./routes/portfolio');
const user = require('./routes/user');

const app = express();
const port = 3000 || process.env.port;
