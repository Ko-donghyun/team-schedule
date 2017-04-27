
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


/**
 * 스케줄 조회 유효성 검사
 *
 * @param userId
 */
exports.getSchedule = function(userId) {
  return new Promise(function(resolve, reject) {
    if (userId === undefined) {
      return reject(new helper.makePredictableError(200, '필요한 파라미터를 다 받지 못했습니다.'));
    }

    resolve();
  });
};


/**
 * 스케줄 조회 유효성 검사
 *
 * @param userId
 * @param monday
 * @param tuesday
 * @param wednesday
 * @param thursday
 * @param friday
 * @param saturday
 * @param sunday
 */
exports.save = function(userId, monday, tuesday, wednesday, thursday, friday, saturday, sunday) {
  return new Promise(function(resolve, reject) {
    if (userId === undefined || monday === undefined || tuesday === undefined || wednesday === undefined
      || thursday === undefined || friday === undefined || saturday === undefined || sunday === undefined) {
      return reject(new helper.makePredictableError(200, '필요한 파라미터를 다 받지 못했습니다.'));
    }

    resolve();
  });
};