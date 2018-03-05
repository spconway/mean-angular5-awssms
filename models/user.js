var mongoose = require('mongoose');
var bcrypt = require('bcrypt');

var UserSchema = new mongoose.Schema({
	email: {
		type: String,
		unique: true,
		required: true,
		trim: true
	},
	username: {
		type: String,
		unique: true,
		required: true,
		trim: true
	},
	password: {
		type: String,
		required: true
	},
	passwordConf: {
		type: String,
		required: true
	},
  creationDate: {
    type: Date,
    default: Date.now
  },
  messages: [{
    type: mongoose.Schema.ObjectId,
    ref: 'Message'
  }]
});

//hashing a password before saving it to the database
UserSchema.pre('save', function (next) {
  var user = this;
  bcrypt.hash(user.password, 10, function (err, hash){
    if (err) {
      return next(err);
    }
    user.password = hash;
    next();
  })
});

//authenticate input against database
UserSchema.statics.authenticate = function (email, password, callback) {
  User.findOne({ email: email })
    .exec(function (err, user) {
      if (err) {
        return callback(err)
      } else if (!user) {
        return callback(err);
      }
      bcrypt.compare(password, user.password, function (err, result) {
        if (result === true) {
          return callback(null, user);
        } else {
          return callback();
        }
      })
    });
}

UserSchema.statics.getMessages = function(user, cb) {
  console.log('Entering getMessages');
  User.findOne({ username: user.username })
    .populate('messages')
    .exec(function(err, data) {
      if (err) {
        return cb(err, null);
      } else {
        return cb(null, data);
      }
    });
}

var User = mongoose.model('User', UserSchema);
module.exports = User;
