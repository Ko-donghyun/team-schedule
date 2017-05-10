const express = require('express');
const router = express.Router();

const User = require('./../model/user');
const Group = require('./../model/group');
const UserGroup = require('./../model/userGroup');
const Schedule = require('./../model/schedule');

const helper = require('./helper/helper');
const groupValidation = require('./validation/validation');


/* 그룹 조회 */
router.get('/', (req, res, next) => {
  console.log('그룹 조회 미들웨어 시작');

  const userId = req.query.user_id;

  console.log('유효성 검사 시작');
  groupValidation.getGroupList(userId).then(() => {
    console.log('유효성 검사 완료');
    console.log('유저 조회 시작');

    return User.findOne({
      attributes: ['id'],
      where: {
        id: userId,
      },
    });
  }).then((user) => {
    console.log('유저 조회 완료');
    if (!user) {
      throw helper.makePredictableError(200, '존재하지 않는 유저입니다.');
    }

    console.log('그룹 조회 시작');
    return UserGroup.findAll({
      attributes: ['user_id', 'group_id', 'group_title', 'group_type'],
      where: {
        user_id: userId,
        approval: true,
      }
    });
  }).then((groups) => {
    console.log('그룹 조회 완료');
    console.log('리스폰 보내기');

    res.json({
      success: 1,
      message: '그룹 조회 성공했습니다',
      result: {
        groups,
      }
    });
  }).catch((err) => {
    if (err.statusCode !== 200) {
      console.log('그룹 조회 중 에러: %s', err.stack);
    }

    next(err);
  });
});


/* 그룹 정보 수정 */
router.post('/', (req, res, next) => {
  console.log('그룹 정보 수정 미들웨어 시작');

  const userId = req.body.user_id;
  const groupId = req.body.group_id;
  const groupTitle = req.body.title;
  const groupType = req.body.type;

  console.log('유효성 검사 시작');
  groupValidation.updateGroupInfo(userId, groupId, groupTitle, groupType).then(() => {
    console.log('유효성 검사 완료');
    console.log('유저 그룹 조회 시작');

    return UserGroup.findOne({
      attributes: ['id'],
      where: {
        user_id: userId,
        group_id: groupId,
      },
    });
  }).then((userGroup) => {
    console.log('유저 그룹 조회 완료');
    if (!userGroup) {
      throw helper.makePredictableError(200, '존재하지 않거나 접근할 수 없는 그룹 정보 입니다.');
    }

    console.log('그룹 정보 업데이트 시작');
    return UserGroup.update({
      group_title: groupTitle,
      group_type: groupType,
    }, {
      where: {
        id: userGroup.id
      }
    }).spread((affectedCount, affectedRows) => {
      return Promise.resolve(userGroup);
    });
  }).then((userGroup) => {
    console.log('그룹 정보 업데이트 완료');
    console.log('리스폰 보내기');

    res.json({
      success: 1,
      message: '그룹 정보 업데이트 성공했습니다',
    });
  }).catch((err) => {
    if (err.statusCode !== 200) {
      console.log('그룹 정보 업데이트 중 에러: %s', err.stack);
    }

    next(err);
  });
});


/* 그룹 생성 */
router.post('/create', (req, res, next) => {
  console.log('그룹 생성 미들웨어 시작');

  const userId = req.body.user_id;
  const member = req.body.member;
  const groupTitle = req.body.title;
  const groupType = req.body.type;

  console.log('유효성 검사 시작');
  groupValidation.groupCreate(userId, member, groupTitle, groupType).then(() => {
    console.log('유효성 검사 완료');
    console.log('유저 조회 시작');

    return User.findOne({
      attributes: ['id'],
      where: {
        id: userId,
      },
    });
  }).then((user) => {
    console.log('유저 조회 완료');
    if (!user) {
      throw helper.makePredictableError(200, '존재하지 않는 유저입니다.');
    }

    console.log('그룹 생성 시작');
    const groupObject = {
      member_count: (member.length + 1),
      user_id: userId,
    };

    return Group.create(groupObject).then((group) => {
      console.log('그룹 생성 완료');
      console.log('유저 그룹 생성 시작');

      const userGroupObjects = [
        { user_id: userId, group_id: group.id, group_title: groupTitle, group_type: groupType, approval: true},
      ];

      for (let i = 0; i < member.length; i++) {
        const userGroupObject = {
          user_id: member[i], group_id: group.id, group_title: groupTitle, group_type: groupType, approval: false
        };

        userGroupObjects.push(userGroupObject);
      }

      return UserGroup.bulkCreate(userGroupObjects).then(() => {
        return Promise.resolve(group);
      });
    });
  }).then((group) => {
    console.log('유저 그룹 생성 완료');
    console.log('리스폰 보내기');

    res.json({
      success: 1,
      message: '그룹 생성 성공했습니다',
      result: {
        group,
      }
    });
  }).catch((err) => {
    if (err.statusCode !== 200) {
      console.log('그룹 생성 중 에러: %s', err.stack);
    }

    next(err);
  });
});

module.exports = router;
