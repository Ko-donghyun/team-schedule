const express = require('express');
const router = express.Router();
const passport = require('passport');
const multiparty = require('multiparty');
const multipart = require('connect-multiparty');

const multipartMiddleware = multipart({autoFiles: true, uploadDir: __dirname + '/../public/images'});

const User = require('./../model/user');
const Schedule = require('./../model/schedule');

const helper = require('./helper/helper');
const userValidation = require('./validation/validation');


/* 회원가입 */
router.post('/signup', (req, res, next) => {
  console.log('회원가입 미들웨어 시작');

  const email = req.body.email;
  const password = req.body.password;
  const passwordConfirm = req.body.password_confirm;

  console.log('유효성 검사 시작');
  userValidation.signUp(email, password, passwordConfirm).then(() => {
    console.log('유효성 검사 완료');
    console.log('유저 정보 저장 시작');

    return User.findOne({
      attributes: ['id', 'deleted_at'],
      where: {
        email,
      },
      paranoid: false
    }).then((user) => {
      if (!user) {
        const salt = helper.makeSalt();
        const userObject = {
          email,
          nickname: '익명의 ' + helper.getRandomNickName(),
          encrypt_password: helper.encryptPassword(req.body.password, salt),
          salt,
        };

        return User.create(userObject).then((user) => {
          return Schedule.create({
            user_id: user.id,
          }).then(() => {
            return Promise.resolve(user);
          });
        });
      } else {
        throw helper.makePredictableError(200, '이미 존재하는 이메일입니다.');
      }
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

  const email = req.body.email;
  const password = req.body.password;

  console.log('유효성 검사 시작');
  return userValidation.signIn(email, password).then(() => {
    console.log('유효성 검사 완료');
    console.log('로그인 시작');

    return passport.authenticate('local', (err, user, info) => {
      if (err) {
        return next(err);
      } else if (!user) {
        console.log('로그인 과정에서 유저 확인 불가');
        console.log(info);

        return next(helper.makePredictableError(200, info.message));
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
            email: user.email,
            nickname: user.nickname,
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


/* 로그아웃 */
router.get('/signout', (req, res, next) => {
  console.log('로그아웃 미들웨어 시작');
  req.logout();
  res.json({
    success: 1,
    message: '로그아웃 완료되었습니다.',
  });
});


/* 유저 조회 */
router.get('/find', (req, res, next) => {
  console.log('유저 조회 미들웨어 시작');

  const email = req.query.email;

  console.log('유효성 검사 시작');
  return userValidation.userCheck(email).then(() => {
    console.log('유효성 검사 완료');
    console.log('유저 조회 시작');

    return User.findOne({
      attributes: ['id', 'email', 'profile', 'nickname'],
      where: {
        email,
      },
    });
  }).then((user) => {
    console.log('유저 조회 완료');
    if (!user) {
      throw helper.makePredictableError(200, '존재하지 않는 유저입니다.');
    }

    console.log('리스폰 보내기');
    res.json({
      success: 1,
      message: '유저 조회 성공했습니다',
      result: {
        user,
      }
    });
  }).catch((err) => {
    if (err.statusCode !== 200) {
      console.log('유저 조회 중 에러: %s', err.stack);
    }

    next(err);
  });
});


/* 유저 정보 받기 */
router.get('/info', (req, res, next) => {
  console.log('유저 정보 조회 미들웨어 시작');

  const userId = req.query.user_id;

  console.log('유효성 검사 시작');
  return userValidation.getUserInfo(userId).then(() => {
    console.log('유효성 검사 완료');
    console.log('유저 정보 조회 시작');

    return User.findOne({
      attributes: ['id', 'email', 'profile', 'nickname'],
      where: {
        id: userId,
      },
    });
  }).then((user) => {
    console.log('유저 정보 조회 완료');
    if (!user) {
      throw helper.makePredictableError(200, '존재하지 않는 유저입니다.');
    }

    console.log('리스폰 보내기');
    res.json({
      success: 1,
      message: '유저 정보 조회 성공했습니다',
      result: {
        user,
      }
    });
  }).catch((err) => {
    if (err.statusCode !== 200) {
      console.log('유저 정보 조회 중 에러: %s', err.stack);
    }

    next(err);
  });
});



/* 유저 이름 수정 */
router.post('/rename', (req, res, next) => {
  console.log('유저 이름 수정 미들웨어 시작');

  const userId = req.body.user_id;
  const newNickname = req.body.new_nickname;
  // const password = req.body.password;
  const password = 'empty';

  console.log('유효성 검사 시작');
  return userValidation.userRename(newNickname, password, userId).then(() => {
    console.log('유효성 검사 완료');
    console.log('유저 조회 시작');

    return User.findOne({
      attributes: ['id', 'email', 'profile', 'nickname', 'encrypt_password', 'salt'],
      where: {
        id: userId,
      },
    });
  }).then((user) => {
    console.log('유저 조회 완료');
    if (!user) {
      throw helper.makePredictableError(200, '존재하지 않는 유저입니다.');
    }

    // if (!helper.checkPassword(password, user.salt, user.encrypt_password)) {
    //   throw helper.makePredictableError(200, '비밀번호가 일치하지 않습니다.');
    // }

    console.log('유저 닉네임 변경 시작');
    user.nickname = newNickname;
    return user.save();
  }).then((user) => {
    console.log('유저 닉네임 변경 완료');
    console.log('리스폰 보내기');

    res.json({
      success: 1,
      message: '유저 닉네임 변경 성공했습니다',
      result: {
        user: {
          id: user.id,
          nickname: user.nickname,
          email: user.email,
        },
      },
    });
  }).catch((err) => {
    if (err.statusCode !== 200) {
      console.log('유저 닉네임 변경 중 에러: %s', err.stack);
    }

    next(err);
  });
});

/* 유저 프로필 사진 저장 */
router.post('/profile', multipartMiddleware, (req, res, next) => {
  console.log('유저 프로필 저장 미들웨어 시작');

  const userId = req.body.user_id;
  const profileImage = req.files.profile_image;

  console.log('유효성 검사 시작');
  return userValidation.userProfile(profileImage, userId).then(() => {
    console.log('유효성 검사 완료');
    console.log('유저 조회 시작');

    return User.findOne({
      attributes: ['id', 'email', 'profile', 'nickname', 'encrypt_password', 'salt'],
      where: {
        id: userId,
      },
    });
  }).then((user) => {
    console.log('유저 조회 완료');
    if (!user) {
      throw helper.makePredictableError(200, '존재하지 않는 유저입니다.');
    }

    console.log('유저 프로필 이미지 받기 시작');
    return helper.saveProfileImage(user, profileImage);
  }).then((user) => {
    console.log('유저 프로필 이미지 저장 완료');
    console.log('디비 반영 시작');

    return user.save();
  }).then((user) => {
    console.log('유저 프로필 이미지 저장 완료');
    console.log('리스폰 보내기');

    res.json({
      success: 1,
      message: '유저 프로필 저장 성공했습니다',
      result: {
        user: {
          id: user.id,
          nickname: user.nickname,
          profile: user.profile,
          email: user.email,
        },
      },
    });
  }).catch((err) => {
    if (err.statusCode !== 200) {
      console.log('유저 프로필 저장 중 에러: %s', err.stack);
    }

    next(err);
  });
});



module.exports = router;
