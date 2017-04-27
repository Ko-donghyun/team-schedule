
const Sequelize = require('sequelize');

const sequelize = require('./../config/env/sequelize.js');

const Group = sequelize.define('group', {
  member_count: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 1,
  },
  user_id: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
}, {
  timestamps: true,
  paranoid: true,
  underscored: true,
  collate: 'utf8_unicode_ci',
  engine: 'InnoDB',
});

module.exports = Group;