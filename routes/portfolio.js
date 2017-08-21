const express = require('express');
const router = express.Router;
const Work = require('../models/portfolio');

router.get('/portfolio', function(req, res, next){
  Work.find({})
    .then((data) => {
      res.send(data);
    })
});

router.post('/portfolio', function(req, res, next){
  Work.create(req.body)
    .then((data) => {
      res.send(data);
    })
});

router.patch('/portfolio/:id', function(req, res, next){
  Work.findByIdAndUpdate({_id: req.params.id})
    .then((data) => {
      res.send(data);
    })
});

router.delete('/portfolio/:id', function(req, res, next){
  Work.findByIdAndDelete({_id:req.params.id})
    .then((data) => {
      res.send(data);
    })
});
