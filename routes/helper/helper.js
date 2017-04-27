
const crypto = require('crypto');

/**
 * 예측 가능한 에러를 리턴하는 메서드
 *
 * @param statusCode
 * @param message
 */
exports.makePredictableError = function(statusCode, message) {
  var err = new Error(message);
  err.statusCode = statusCode;
  return err;
};

exports.makeSalt = function() {
  return crypto.randomBytes(16).toString('base64');
};

exports.encryptPassword = function(password, salt) {
  salt = new Buffer(salt, 'base64');
  return crypto.pbkdf2Sync(password, salt, 10000, 64).toString('base64');
};

