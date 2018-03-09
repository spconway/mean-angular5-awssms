let logger = require('./logger');
let jwt = require('jsonwebtoken');

module.exports.init = function(user) {
  let userId = user._id.toString();
  let token = jwt.sign({}, '5uper5a!anFive1$Fake', {
    expiresIn: 120,
    subject: userId
  });
  return token;
};
