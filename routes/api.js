var express = require('express');
var router = express.Router();
var Message = require('../models/message');
var User = require('../models/user');
var logger = require('../config/logger');
var jwt = require('../config/jsonwebtoken');

/**
 * GET
 * '/'
 * find all messages for user
 */
router.get('/messages', function(req, res, next) {
  // res.send('/messages');
  let response = [{
    "phone": "7742328575",
    "message": "this message is coming from the server",
    "messageStatus": "DELIVERED",
    "id": "00000000000"
  }];

  User.getMessages({ username: 'test' }, function(err, data) {
    if (err) {
      res.status(400).send('Error in request. Possibly no messages.');
    } else{
      // res.status(200).json(data);
      console.log('About to send response from messages route.');
      res.status(200).json(response);
    }
  });
});

/**
 * POST
 * '/'
 * return xxx with info about message
 */
router.post('/messages', function(req, res, next) {
  if (req.body.date && req.body.message && req.body.phone) {
    let messageData = {
      executionDate: req.body.date,
      message: req.body.message,
      phone: req.body.phone
    };
    //use schema.create to insert data into the db
    Message.create(messageData, function (err, message) {
      if (err) {
        return next(err);
      } else {
        console.log('message id: ', message._id);
        let response = {
          message: 'hidden for security purposes',
          error: null,
          messageId: null,
          date: req.body.date,
          messageStatus: 'Your record will be sent on: ' + response.date
        };
        /* update parent record */
        User.findByIdAndUpdate(req.session.userId, { messages: message }, function(err, doc) {
          if(err){
            console.log('error finding by one and updating: ', err);
            response.message = 'There was an error processing your request.';
            res.status(500).json(response);
          }else{
            console.log('successfully found and updated parent record');
          }
        });
        return res.status(201).json(response);
      }
    });
  } else {
    response.messageStatus = 'There was an error processing your request.';
    res.status(500).json(response);
  }
});

/**
 * GET
 * '/'
 * return 200 with all users
 */
router.get('/users', function(req, res, next) {
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
          idToken: token,
          expiresIn: 120,
          user: user
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
