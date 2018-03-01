var express = require('express');
var router = express.Router();
var Message = require('../models/message');
var User = require('../models/user');

/**
 * GET
 * '/'
 * find all messages for user
 */
router.get('/', function(req, res, next) {
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
			res.status(200).json(response);
		}
	});
});

/**
 * POST
 * '/'
 * return xxx with info about message
 */
router.post('/', function(req, res, next) {
  if (req.body.date && req.body.message && req.body.phone) {
    let messageData = {
      executionDate: req.body.date,
      message: req.body.message,
      phone: req.body.phone
    }
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
			  	message: 'Your record will be sent on: ' + response.date
        }
        /* update parent record */
        User.findByIdAndUpdate(req.session.userId, { messages: message }, function(err, doc) {
          if(err){
            console.log('error finding by one and updating: ', err);
            response.message = 'There was an error processing your request.'
            res.status(500).json(response);
          }else{
            console.log('successfully found and updated parent record');
          }
        });
        return res.status(201).json(response);
      }
    });
  } else {
    response.message = 'There was an error processing your request.'
    res.status(500).json(response);
  }
});

module.exports = router;
