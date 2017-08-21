const express = require('express');
const router = express.Router;

router.get('/me', function(req, res, next){
  res.send({type: "GET"});
});

router.post('/me', function(req, res, next){
  res.send({type: "POST"});
});

router.put('/me', function(req, res, next){
  res.send({type: "GET"});
});
