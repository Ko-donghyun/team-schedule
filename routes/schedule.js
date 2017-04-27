const express = require('express');
const router = express.Router();
const passport = require('passport');

const User = require('./../model/user');
const Schedule = require('./../model/schedule');

const helper = require('./helper/helper');
const scheduleValidation = require('./validation/validation');


/* 시간표 조회 */
router.get('/', (req, res, next) => {
  console.log('시간표 조회 미들웨어 시작');

  const userId = req.query.user_id;

  console.log('유효성 검사 시작');
  scheduleValidation.getSchedule(userId).then(() => {
    console.log('유효성 검사 완료');
    console.log('유저의 시간표 가져오기 시작');

    return Schedule.findOne({
      attributes: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'],
      where: {
        user_id: userId
      }
    }).then((schedule) => {
      if (!schedule) {
        throw helper.makePredictableError(200, '조회에 실패했습니다');
      }

      return schedule;
    });
  }).then((schedule) => {
    console.log('유저의 시간표 가져오기 완료');
    console.log('리스폰 보내기');

    res.json({
      success: 1,
      message: '유저의 시간표 가져오기 완료했습니다',
      result: {
        schedule,
      }
    });
  }).catch((err) => {
    if (err.statusCode !== 200) {
      console.log('유저의 시간표 가져오기 중 에러: %s', err.stack);
    }

    next(err);
  });
});


/* 시간표 저장 */
router.post('/', (req, res, next) => {
  console.log('시간표 저장 미들웨어 시작');

  const userId = req.body.user_id;
  const monday = req.body.monday;
  const tuesday = req.body.tuesday;
  const wednesday = req.body.wednesday;
  const thursday = req.body.thursday;
  const friday = req.body.friday;
  const saturday = req.body.saturday;
  const sunday = req.body.sunday;

  console.log('유효성 검사 시작');
  return scheduleValidation.save(userId, monday, tuesday, wednesday, thursday, friday, saturday, sunday).then(() => {
    console.log('유효성 검사 완료');
    console.log('유저의 시간표 저장 시작');

    return Schedule.findOne({
      // attributes: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday', 'user_id'],
      where: {
        user_id: userId
      }
    }).then((schedule) => {
      if (!schedule) {
        throw helper.makePredictableError(200, '조회에 실패했습니다');
      }

      schedule.monday = monday;
      schedule.tuesday = tuesday;
      schedule.wednesday = wednesday;
      schedule.thursday = thursday;
      schedule.friday = friday;
      schedule.saturday = saturday;
      schedule.sunday = sunday;
      schedule.user_id = userId;
      return schedule.save();
    });
  }).then((schedule) => {
    console.log('유저의 시간표 저장 완료');
    console.log('리스폰 보내기');

    res.json({
      success: 1,
      message: '유저의 시간표 저장 완료했습니다',
      result: {
        schedule,
      }
    });
  }).catch((err) => {
    if (err.statusCode !== 200) {
      console.log('로그인 미들웨어 에러: %s', err.stack);
    }

    next(err);
  });
});




module.exports = router;
