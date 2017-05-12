
const helper = require('./../helper/helper.js');

/**
 * 회원가입 유효성 검사
 *
 * @param email
 * @param password
 * @param passwordConfirm
 */
exports.signUp = function(email, password, passwordConfirm) {
  return new Promise(function(resolve, reject) {
    if (email === undefined || password === undefined || passwordConfirm === undefined) {
      return reject(new helper.makePredictableError(200, '필요한 파라미터를 다 받지 못했습니다.'));
    }
    if (password !== passwordConfirm) {
      return reject(new helper.makePredictableError(200, '비밀번호가 서로 일치하지 않습니다.'));
    }

    resolve();
  });
};


/**
 * 로그인 유효성 검사
 *
 * @param email
 * @param password
 */
exports.signIn = function(email, password) {
  return new Promise(function(resolve, reject) {
    if (email === undefined || password === undefined) {
      return reject(new helper.makePredictableError(200, '필요한 파라미터를 다 받지 못했습니다.'));
    }

    resolve();
  });
};


/**
 * 유저 체크 유효성 검사
 *
 * @param email
 */
exports.userCheck = function(email) {
  return new Promise(function(resolve, reject) {
    if (email === undefined) {
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


/**
 * 그룹 생성 유효성 검사
 *
 * @param userId
 * @param member
 * @param groupTitle
 * @param groupType
 */
exports.groupCreate = function(userId, member, groupTitle, groupType) {
  return new Promise(function(resolve, reject) {
    if (userId === undefined || groupTitle === undefined || groupType === undefined || member === undefined) {
      return reject(new helper.makePredictableError(200, '필요한 파라미터를 다 받지 못했습니다.'));
    }

    if (!Array.isArray(member)) {
      return reject(new helper.makePredictableError(200, '멤버 형식이 잘못되었습니다.'));
    }

    const compactMember = Array.from(new Set(member));
    resolve(compactMember.filter(item => item != userId));
  });
};

/**
 * 그룹 조회 유효성 검사
 *
 * @param userId
 */
exports.getGroupList = function(userId) {
  return new Promise(function(resolve, reject) {
    if (userId === undefined) {
      return reject(new helper.makePredictableError(200, '필요한 파라미터를 다 받지 못했습니다.'));
    }

    resolve();
  });
};


/**
 * 그룹 정보 수정 유효성 검사
 *
 * @param userId
 * @param groupId
 * @param groupTitle
 * @param groupType
 */
exports.updateGroupInfo = function(userId, groupId, groupTitle, groupType) {
  return new Promise(function(resolve, reject) {
    if (userId === undefined || groupTitle === undefined || groupType === undefined || groupId === undefined) {
      return reject(new helper.makePredictableError(200, '필요한 파라미터를 다 받지 못했습니다.'));
    }

    resolve();
  });
};


/**
 * 그룹 초대 수락 유효성 검사
 *
 * @param userId
 * @param groupId
 */
exports.joinGroup = function(userId, groupId) {
  return new Promise(function(resolve, reject) {
    if (userId === undefined || groupId === undefined) {
      return reject(new helper.makePredictableError(200, '필요한 파라미터를 다 받지 못했습니다.'));
    }

    resolve();
  });
};