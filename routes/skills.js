const express = require('express');
const router = express.Router;

router.get('/skills', function(req, res, next){
  res.send({type: "GET"});
});

router.post('/skills', function(req, res, next){
  res.send({type: "POST"});
});

router.put('/skills/:id', function(req, res, next){
  res.send({type: "GET"});
});

router.delete('/skills/:id', function(req, res, next){
  res.send({type: "DELETE"});
});
