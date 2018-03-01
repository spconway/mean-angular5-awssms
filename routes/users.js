var express = require('express');
var router = express.Router();
var User = require('../models/user');
var logger = require('../config/logger');

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
 * '/username/account'
 * return 200 with secure user information
 */
router.get('/username/account', function(req, res, next) {
	let input = {
		email: req.body.email,
		username: req.body.username,
		password: req.body.password,
		passwordConf: req.body.passwordConf
	};

	validateLogin(input) ? authenticateUser(input) : res.status(401).send("Invalid user.");
});

/**
 * POST
 * '/username/account'
 * return 201 after successful user account creation
 */
router.post('/username/account', function(req, res, next) {
	let input = {
		email: req.body.email,
		username: req.body.username,
		password: req.body.password,
		passwordConf: req.body.passwordConf
	};

	validateLogin(input) ? createUser(input) : res.status(400).send("A field was not filled in.");
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
 * [createUser description]
 * @param  {[type]} input [description]
 * @return {[type]}       [description]
 */
function createUser(input) {
	//use schema.create to insert data into the db
	User.create(userData, function (err, user) {
	  if (err) {
	  	var err = new Error('Something went wrong.');
			err.status = 400;
	    return next(err);
	  } else {
	    return res.status(201).send('Successfully created new user account.');
	  }
	});
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
