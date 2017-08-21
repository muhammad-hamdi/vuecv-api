const express = require('express');
const router = express.Router;
const User = require('../models/user');

router.get('/me', function(req, res, next){
  User.find({})
    .then((data) => {
        res.send(data);
    })
});

router.post('/me', function(req, res, next){
  User.create(req.body)
    .then((data) => {
      res.send(data)
    })
});

router.patch('/me/:id', function(req, res, next){
  User.findByIdAndUpdate({_id:req.params.id}, req.body)
    .then((data) => {
      res.send(data);
    })
});
