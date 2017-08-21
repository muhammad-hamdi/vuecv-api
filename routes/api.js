const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const app = express();

const config = require('../config');
const Skill = require('../models/skills');
const Work = require('../models/portfolio');
const User = require('../models/user');

router.post('/login', function(req, res, next){
  User.findOne({
    name: req.body.name
  }, function(err, user){
    if(err) throw err;

    if(!user) {
      res.json({success: false, message: 'Authentication failed, User not found.'});
    } else if (user) {
      if (user.password != req.body.password){
        res.json({success: false, message: 'Authentication failed, Wrong Password'});
      } else {
        var token = jwt.sign(user, config.secret);
        res.json({
          success: true,
          message: 'Token Sent',
          token: token
        });
      }
    }
  });
});

router.use(function(req, res, next) {

  // check header or url parameters or post parameters for token
  var token = req.body.token || req.query.token || req.headers['Authorization'];

  // decode token
  if (token) {

    // verifies secret and checks exp
    jwt.verify(token, config.secret, function(err, decoded) {
      if (err) {
        return res.json({ success: false, message: 'Failed to authenticate token.' });
      } else {
        // if everything is good, save to request for use in other routes
        req.decoded = decoded;
        next();
      }
    });

  } else {

    // if there is no token
    // return an error
    return res.status(403).send({
        success: false,
        message: 'No token provided.'
    });

  }
});

router.get('/users', function(req, res, next){
  User.find({})
    .then((data) => {
        res.send(data);
    });
});

router.post('/users', function(req, res, next){
  User.create(req.body)
    .then((data) => {
      res.send(data)
    });
});

router.patch('/users/:id', function(req, res, next){
  User.findByIdAndUpdate({_id:req.params.id}, req.body)
    .then((data) => {
      res.send(data);
    });
});

router.get('/skills', function(req, res, next){
  Skill.find({})
    .then((data) => {
      res.send(data);
    });
});

router.post('/skills', function(req, res, next){
  Skill.create(req.body)
    .then((data) => {
      res.send(data);
    })
});

router.patch('/skills/:id', function(req, res, next){
  Skill.findByIdAndUpdate({_id: req.params.id})
    .then((data) => {
      res.send(data);
    })
});

router.delete('/skills/:id', function(req, res, next){
  Skill.findByIdAndDelete({_id: req.params.id})
    .then((data) => {
      res.send(data);
    })
});

router.get('/portfolio', function(req, res, next){
  Work.find({})
    .then((data) => {
      res.send(data);
    });
});

router.post('/portfolio', function(req, res, next){
  Work.create(req.body)
    .then((data) => {
      res.send(data);
    });
});

router.patch('/portfolio/:id', function(req, res, next){
  Work.findByIdAndUpdate({_id: req.params.id})
    .then((data) => {
      res.send(data);
    });
});

router.delete('/portfolio/:id', function(req, res, next){
  Work.findByIdAndDelete({_id:req.params.id})
    .then((data) => {
      res.send(data);
    });
});

module.exports = router;
