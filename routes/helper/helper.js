
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const randomString = require("randomstring");
const AWS = require('aws-sdk');
const credentials = require('./../../credentials.js');

const s3 = new AWS.S3({accessKeyId: credentials.s3AccessKey, secretAccessKey: credentials.s3SecretKey});
const s3Bucket = credentials.s3Bucket;

/**
 * 예측 가능한 에러를 리턴하는 메서드
 *
 * @param statusCode
 * @param message
 */
exports.makePredictableError = function(statusCode, message) {
  const err = new Error(message);
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

exports.checkPassword = function(password, salt, encrypt_password) {
  salt = new Buffer(salt, 'base64');
  return crypto.pbkdf2Sync(password, salt, 10000, 64).toString('base64') === encrypt_password;
};

exports.saveProfileImage = function(user, profileImage) {
  return new Promise((resolve, reject) => {
    const _this = this;
    const randomFileName = new Date().getTime() + randomString.generate(7);
    const filePath = __dirname + '/../../public/images/' + randomFileName + path.extname(profileImage.path);

    fs.rename(profileImage.path, filePath, (err) => {
      if (err) {
        return reject(new _this.makePredictableError(200, '파일 저장 실패했습니다.'));
      }

      console.log('S3 저장 시작');
      const params = {Bucket: s3Bucket, Key: randomFileName + path.extname(profileImage.path),
        ACL: 'public-read',
        ContentType: profileImage.type,
        Body: fs.createReadStream(filePath)};
      return s3.upload(params, function(err, data) {
        if (err) {
          console.log(err);
          return reject(new _this.makePredictableError(200, 'S3 파일 저장 실패했습니다.'));
        } else {
          console.log('S3 저장 완료');
          user.profile = 'https://s3.ap-northeast-2.amazonaws.com/teamschedule/' + data.key;

          fs.access(filePath, fs.F_OK, function(err) {
            if (err) {
              return reject(new _this.makePredictableError(200, '로컬 파일 삭제 실패했습니다.'));
            }

            fs.unlink(filePath, function(err) {
              if (err) {
                return reject(new _this.makePredictableError(200, '로컬 파일 삭제 실패했습니다.'));
              } else {
                resolve(user);
              }
            });
          });
        }
      });
    });
  });
};
