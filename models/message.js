var mongoose = require('mongoose');
var logger = require('../config/logger');

var MessageSchema = new mongoose.Schema({
	user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User'
  },
  message: {
    type: String,
    required: true
  },
  phone: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    default: 'SUBMITTED'
  },
  executionDate: {
    type: Date,
    required: true
  },
  messageId: {
    type: String,
    required: false
  },
  creationDate: {
    type: Date,
    default: Date.now
  },
  modificationDate: {
    type: Date
  }
});

MessageSchema.statics.findByExecutionDateLessThanNowAndSubmitted = function (cb){
  var date = new Date();
  var now = date.toISOString();
  Message.find({ executionDate: { '$lte': now }, status: "SUBMITTED" }, function(err, data) {
    if(err){
      logger.error('Error finding messages: ', err.stack);
      cb(err, null);
    }else{
      cb(null, data);
    }
  });
}

MessageSchema.statics.update = function (id, values, cb) {
  Message.findByIdAndUpdate(id, values, function(err, data) {
    if(err){
      logger.error('Error updating records: ', err);
      cb(err, null);
    }else {
      cb(null, data);
    }
  });
}

// function getMessages(user, cb) {
//   Message.find({ user: user.username }, function(err, data) {
//     if(err){
//       logger.error('Error updating records: ', err);
//       cb(err, null);
//     }else {
//       console.log('SUCCESSSSS: ', data);
//       cb(null, data);
//     }
//   });
// }

var Message = mongoose.model('Message', MessageSchema);
module.exports = Message;