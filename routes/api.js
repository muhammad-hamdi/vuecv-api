const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const multer  = require('multer');
const crypto = require('crypto');
const path = require('path');
const fs = require('fs');
const app = express();
const port = process.env.port || 4000;

const config = require('../config');
const User = require('../models/user');
const Skill = require('../models/skills');
const Work = require('../models/portfolio');
const Exp = require('../models/exp');

var storage = multer.diskStorage({
  destination: './uploads/images/',
  filename: function (req, file, cb) {
    crypto.randomBytes(16, function (err, raw) {
      if (err) return cb(err)
      cb(null, raw.toString('hex') + path.extname(file.originalname))
    })
  }
})
var upload = multer({ storage: storage })

router.post('/uploads/:id', upload.single('file'), function(req, res, next){
    if (!req.file) {
    console.log("No file received");
    return res.send({
      success: false
    });

  } else {
    console.log('file received');
    const host = req.hostname;
    const filePath = req.protocol + "://" + host+':'+ port + '/' + req.file.path;
    console.log(filePath);
    User.findByIdAndUpdate(req.params.id, {'image': filePath})
      .then((data) => {
        res.send(data);
      });
  }
})

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

router.get('/data/:id', function(req, res, next){
    Promise.all([User.findById({_id: req.params.id}),
                 Skill.find({user_id: req.params.id}),
                 Work.find({user_id: req.params.id}),
                 Exp.find({user_id: req.params.id})
             ])
             .then(data => {
                 let userData = data[0];
                 let userSkills = data[1];
                 let userWorks = data[2];
                 let userExp = data[3];

                 res.json({
                     user: userData,
                     skills: userSkills,
                     works: userWorks,
                     exp: userExp
                 })
             })
});

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

router.post('/user/portfolio', upload.single('file'), function(req, res, next){
  if (!req.file) {
  console.log("No file received");
  return res.status(403).send({
    success: false
  });

} else {
  console.log('file received');
  const host = req.hostname;
  const filePath = req.protocol + "://" + host+':'+ port + '/' + req.file.path;
  console.log(filePath);
  let newWork = new Work({
    name: req.body.name,
    category: req.body.category,
    link: req.body.link,
    description: req.body.description,
    user_id: req.body.user_id,
    image_url: filePath,
  })
  console.log(newWork);
  newWork.save((err, work) => {
    if(err){
      res.json({
        success: false,
        message: err
      })
    } else {
      res.send(work);
    }
  })
}
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
router.patch('/user/exp/:id', function(req, res, next){
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

router.post('/email', function(req, res){
    var transporter = nodemailer.createTransport({
		service: 'Gmail',
		auth: {
			user: 'mycvcontact123@gmail.com',
			pass: 'web contact'
		},
	    tls: {
	        rejectUnauthorized: false
	    }
	});
    var mailOptions = {
		from: req.body.name+'<'+req.body.senderEmail+'>',
		to: req.body.userEmail,
		subject: 'CV Contact Form',
		text: 'You have a new message!',
		html: `
			<div style='
                width: 50%;
                background-color: rgba(238, 238, 238, 0.3);
                margin: auto;
                position: relative;
                padding-bottom: 20px;
                box-shadow: 0 2px 2px 0 rgba(0,0,0,0.14), 0 1px 5px 0 rgba(0,0,0,0.12), 0 3px 1px -2px rgba(0,0,0,0.2);
				'>
				<h1 style='
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                    margin: 0;
                    background: #3498db;
                    color: #FFF;
                    padding: 10px;
                    font-size: 15px;
                '> You have a new message!</h1>
				<ul>
					<li style='margin: 2px auto;'><b>Sender Name:</b> &nbsp;`+req.body.name+`</li>
                    <li style='margin: 2px auto;'><b>Sender Email:</b> &nbsp;`+req.body.senderEmail+`</li>
					<li style='margin: 2px auto;'><b>Sender Email:</b> &nbsp;`+req.body.subject+`</li>
					<li style='margin: 2px auto;'><b>Sender Message is below:</li>
				</ul>
                <p style='
                    background: #FFF;
                    padding: 5px 10px;
                    border: 1px solid #EEE;
                    width: 85%;
                    margin: auto;
                '>
                    `+req.body.message+`
                </p>

			</div>
		`
	};
    transporter.sendMail(mailOptions, function(error, info){
		if (error) {
			console.log('___Error: => '+ error);
			res.redirect('/contact');
		}else{
			console.log('Message Sent! ' + info.response);
		}
	})
});
module.exports = router;
