
const helper = require('./../helper/helper.js');

/**
 * 회원가입 유효성 검사
 *
 * @param nickname
 * @param password
 * @param passwordConfirm
 */
exports.signUp = function(nickname, password, passwordConfirm) {
  return new Promise(function(resolve, reject) {
    if (nickname === undefined || password === undefined || passwordConfirm === undefined || (password !== passwordConfirm)) {
      return reject(new helper.makePredictableError(200, '필요한 파라미터를 다 받지 못했습니다.'));
    }

    resolve();
  });
};


/**
 * 로그인 유효성 검사
 *
 * @param nickname
 * @param password
 */
exports.signIn = function(nickname, password) {
  return new Promise(function(resolve, reject) {
    if (nickname === undefined || password === undefined) {
      return reject(new helper.makePredictableError(200, '필요한 파라미터를 다 받지 못했습니다.'));
    }

    resolve();
  });
};