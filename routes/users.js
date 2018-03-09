var express = require('express');
var router = express.Router();
var User = require('../models/user');
var logger = require('../config/logger');
var jwt = require('../config/jsonwebtoken');

/**
 * GET
 * '/'
 * return 200 with all users
 */
router.get('/', function(req, res, next) {
	let response = {
		message: "success",
		code: 200,
		body: "Users root api route. Return all users."
	};
  res.status(200).json(response);
});

/**
 * GET
 * '/login'
 * return 200 with secure user information
 */
router.post('/login', function(req, res, next) {
	if((req.body.email || req.body.username) && req.body.password) {
    User.authenticate(req.body.email, req.body.password, function (err, user) {
      if (err || !user) {
        let err = new Error('Wrong email or password.');
        err.status = 401;
        console.log("Error: ", err);
        return res.status(401).send("Authentication unsuccessful.");
      } else {
        let token = jwt.init(user);
        user.password = null;
        user.messages = null;
        return res.status(200).json({
          user: user,
          token: token
        });
      }
    });
  }
});

/**
 * DELETE
 * '/login'
 * return 200 after deleting user token
 */
router.delete('/login', function(req, res, next) {
  if (req.session) {
    // delete session object
    req.session.destroy(function(err) {
      if(err) {
        return next(err);
      } else {
        return res.status(200).send('Log out successful.');
      }
    });
  } else {
    return res.status(400).send('No session to destroy.');
  }
});

/**
 * POST
 * '/registration'
 * return 201 after successful user account creation
 */
router.post('/registration', function(req, res, next) {
	let input = {
		email: req.body.email,
		username: req.body.username,
		password: req.body.password,
		passwordConf: req.body.passwordConf
	};

  //use schema.create to insert data into the db
  User.create(input, function (err, user) {
    if (err) {
      return next(400).send('Error creating user.');
    } else {
      let response = {
        user: user,
        message: 'Successfully created new user account.'
      };
      return res.status(201).json(response);
    }
  });
});

router.get('/status', function(req, res, next) {
  if(req.token) {
    res.status(200).json({
      status: "status: token",
      token: req.token
    });
  } else {
    res.status(200).json({
      status: "status: no token",
      user: req.token
    });
  }
});

/**
 * [validateLogin description]
 * @param  {[type]} input       [description]
 * @param  {[type]} newUser			[description]
 * @return {[type]}             [description]
 */
function validateLogin(input, newUser) {
	return newUser ? input.email && input.username && input.password && input.passwordConf : input.email && input.password;
}

/**
 * [authenticateUser description]
 * @param  {[type]} input [description]
 * @return {[type]}       [description]
 */
function authenticateUser(input) {
	User.authenticate(req.body.email, req.body.password, function(err, user) {
		if (err || !user) {
			var err = new Error('Wrong email or password.');
			err.status = 401;
			return next(err);
		} else {
			req.session.userId = user._id;
			return res.status(200).send("Successful authentication.");
		}
	});
}

module.exports = router;
