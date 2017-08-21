const express = require('express');
const router = express.Router;

router.get('/portfolio', function(req, res, next){
  res.send({type: "GET"});
});

router.post('/portfolio', function(req, res, next){
  res.send({type: "POST"});
});

router.put('/portfolio/:id', function(req, res, next){
  res.send({type: "GET"});
});

router.delete('/portfolio/:id', function(req, res, next){
  res.send({type: "DELETE"});
});
