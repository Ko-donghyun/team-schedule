
const Sequelize = require('sequelize');

const sequelize = require('./../config/env/sequelize.js');

const UserGroup = sequelize.define('userGroup', {
  user_id: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  group_id: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  group_title: {
    // 처음에는 ~님의 그룹 정도
    type: Sequelize.STRING,
    allowNull: false,
  },
  group_type: {
    type: Sequelize.STRING,
    allowNull: false,
    defaultValue: '소모임',
  },
  approval: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: 0,
  },
}, {
  timestamps: true,
  paranoid: true,
  underscored: true,
  collate: 'utf8_unicode_ci',
  engine: 'InnoDB',
});

module.exports = UserGroup;