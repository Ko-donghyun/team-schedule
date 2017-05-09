
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

exports.getRandomNickName = function() {
  const animals = ['악어', '개미 핥기', '아르마딜로', '오소리', '박쥐', '비버', '버팔로', '낙타', '카멜레온', '치타', '다람쥐', '친칠라', '츄파카브라',
    '가마우지', '코요테', '까마귀', '딩고', '공룡', '돌고래', '오리', '코끼리', '여우', '흰 족제비', '개구리', '기린', '고퍼', '회색 곰', '고슴도치',
    '하마', '하이에나', '자칼', '아이 벡스', '이구아나', '코알라', '크라켄', '여우', '표범', '라이거', '라마', '해우', '밍크', '원숭이', '일각 고래',
    '고양이', '오랑우탄', '수달', '팬더', '펭귄', '오리너구리', '호박', '토끼', '너구리', '코뿔소', '양', '말괄량이', '스컹크', '느린 로리',
    '다람쥐', '거북', '해마', '늑대', '오소리', '웜뱃'];

  return animals[Math.floor(Math.random() * animals.length)];
};

exports.encryptPassword = function(password, salt) {
  salt = new Buffer(salt, 'base64');
  return crypto.pbkdf2Sync(password, salt, 10000, 64).toString('base64');
};

