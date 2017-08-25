const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const app = express();

const config = require('../config');
const User = require('../models/user');
const Skill = require('../models/skills');
const Work = require('../models/portfolio');
const Exp = require('../models/exp');

router.post('/register', function(req,res, next){
  User.create(req.body)
    .then((user) => {
      var token = jwt.sign(user, config.secret);
      res.json({
        success: true,
        message: 'Token Sent',
        token: token,
        id: user._id
      });
    });
})

router.post('/login', function(req, res, next){
  User.findOne({
    email: req.body.email
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
          token: token,
          id: user._id
        });
      }
    }
  });
});

var auth = function(req, res, next) {

  // check header or url parameters or post parameters for token
  var token = req.body.token || req.query.token || req.headers['x-access-token'];

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
};

router.use('/users', auth);

router.use('/skills', auth);

router.use('/skills/:id', auth);

router.use('/portfolio', auth);

router.use('/portfolio/:id', auth);

router.use('/exp', auth);

router.use('/exp/:id', auth);

router.get('/users', function(req, res, next){
  User.find({})
    .then((data) => {
        res.send(data);
    });
});

router.get('/user/:id', function(req, res, next){
  User.findById({_id: req.params.id})
    .then((data) => {
      res.send(data);
    })
});

router.patch('/user/:id', function(req, res, next){
  User.findByIdAndUpdate(req.params.id, req.body)
    .then((data) => {
      res.send(data);
    });
});

router.delete('/user/:id', function(req, res, next){
  User.findByIdAndRemove(req.params.id)
    .then((data) => {
      res.send(data);
    })
})

router.get('/user/:id/skills', function(req, res, next){
  Skill.find({user_id: req.params.id})
    .then((data) => {
      res.send(data);
    })
});

router.post('/user/skills', function(req, res, next){
  Skill.create(req.body)
    .then((data) => {
      res.send(data);
    })
});

router.patch('/user/skills/:id', function(req, res, next){
  Skill.findByIdAndUpdate(req.params.id, req.body)
    .then((data) => {
      res.send(data);
    })
});

router.delete('/user/skills/:id', function(req, res, next){
  Skill.findByIdAndRemove(req.params.id)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => console.log(err));
});

router.get('/user/:id/portfolio', function(req, res, next){
  Work.find({user_id: req.params.id})
    .then((data) => {
      res.send(data);
    })
});

router.post('/user/portfolio', function(req, res, next){
  Work.create(req.body)
    .then((data) => {
      res.send(data);
    });
});

router.patch('/user/portfolio/:id', function(req, res, next){
  Work.findByIdAndUpdate(req.params.id, req.body)
    .then((data) => {
      res.send(data);
    });
});

router.delete('/user/portfolio/:id', function(req, res, next){
  Work.findByIdAndRemove(req.params.id)
    .then((data) => {
      res.send(data);
    });
});

router.get('/user/:id/exp', function(req, res, next){
  Exp.find({user_id: req.params.id})
    .then((data) => {
      res.send(data);
    })
});

router.post('/user/exp', function(req, res, next){
  Exp.create(req.body)
    .then((data) => {
      res.send(data);
    });
});
router.patch('user/exp/:id', function(req, res, next){
    Exp.findByIdAndUpdate(req.params.id, req.body)
        .then((data) => {
            res.send(data);
        });
});
router.delete('/user/exp/:id', function(req, res, next){
  Exp.findByIdAndRemove(req.params.id)
    .then((data) => {
      res.send(data);
    });
});

module.exports = router;
