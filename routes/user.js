const express = require('express');
const router = express.Router();
const passport = require('passport');

var User = require('./../model/user');

const helper = require('./helper/helper');
const userValidation = require('./validation/validation');


/* 회원가입 */
router.post('/signup', (req, res, next) => {
  console.log('회원가입 미들웨어 시작');

  const nickname = req.body.nickname;
  const password = req.body.password;
  const passwordConfirm = req.body.password_confirm;

  console.log('유효성 검사 시작');
  userValidation.signUp(nickname, password, passwordConfirm).then(() => {
    console.log('유효성 검사 완료');
    console.log('유저 정보 저장 시작');

    const salt = helper.makeSalt();

    const userObject = {
      nickname: req.body.nickname,
      encrypt_password: helper.encryptPassword(req.body.password, salt),
      salt,
    };

    return User.findOne({
      attributes: ['id', 'deleted_at'],
      where: {
        nickname: nickname
      },
      paranoid: false
    }).then((user) => {
      if (!user) {
        return User.create(userObject);
      }

      throw helper.makePredictableError(200, '이미 존재하는 닉네임입니다.');
    });
  }).then((user) => {
    console.log('유저 정보 저장 완료');
    console.log('로그인 시키기 시작');

    req.login(user, (err) => {
      if (err) {
        return Promise.reject(err);
      }
      console.log('로그인 시키기 완료');

      Promise.resolve(user);
    });
  }).then((user) => {
    console.log('리스폰 보내기');

    res.json({
      success: 1,
      message: '회원가입에 성공했습니다',
    });
  }).catch((err) => {
    if (err.statusCode !== 200) {
      console.log('회원가입 중 에러: %s', err.stack);
    }

    next(err);
  });
});


/* 로그인 */
router.post('/signin', (req, res, next) => {
  console.log('로그인 미들웨어 시작');

  const nickname = req.body.nickname;
  const password = req.body.password;

  console.log('유효성 검사 시작');
  return userValidation.signIn(nickname, password).then(() => {
    console.log('유효성 검사 완료');
    console.log('로그인 시작');

    return passport.authenticate('local', (err, user, info) => {
      console.log(user);
      if (err) {
        return next(err);
      } else if (!user) {
        console.log('로그인 과정에서 유저 확인 불가');
        return next(helper.makePredictableError(200, info));
      }

      console.log('유저정보 가져오기 완료');
      console.log('로그인 시작');
      return req.login(user, (err) => {
        if (err) {
          console.log('로그인 과정에서 에러 발생: %s\n%s', err.message, err.stack);
          return next(err);
        }

        console.log('로그인 완료');
        console.log('리스폰 보내기');
        return res.json({
          success: 1,
          message: '로그인 완료되었습니다.',
          result: {
            id: user.id,
            nickname: user.nickname
          },
        });
      });
    })(req, res, next);
  }).catch((err) => {
    if (err.statusCode !== 200) {
      console.log('로그인 미들웨어 에러: %s', err.stack);
    }

    next(err);
  });
});




module.exports = router;
