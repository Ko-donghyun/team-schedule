
const Sequelize = require('sequelize');

const sequelize = require('./../config/env/sequelize.js');

const Schedule = sequelize.define('schedule', {
  monday: {
    type: Sequelize.STRING,
    allowNull: false,
    defaultValue: '{"monday": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, ' +
    '0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, ' +
    '0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, ' +
    '0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]}',
  },
  tuesday: {
    type: Sequelize.STRING,
    allowNull: false,
    defaultValue: '{"tuesday": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, ' +
    '0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, ' +
    '0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, ' +
    '0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]}',
  },
  wednesday: {
    type: Sequelize.STRING,
    allowNull: false,
    defaultValue: '{"wednesday": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, ' +
    '0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, ' +
    '0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, ' +
    '0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]}',
  },
  thursday: {
    type: Sequelize.STRING,
    allowNull: false,
    defaultValue: '{"thursday": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, ' +
    '0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, ' +
    '0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, ' +
    '0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]}',
  },
  friday: {
    type: Sequelize.STRING,
    allowNull: false,
    defaultValue: '{"friday": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, ' +
    '0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, ' +
    '0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, ' +
    '0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]}',
  },
  saturday: {
    type: Sequelize.STRING,
    allowNull: false,
    defaultValue: '{"saturday": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, ' +
    '0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, ' +
    '0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, ' +
    '0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]}',
  },
  sunday: {
    type: Sequelize.STRING,
    allowNull: false,
    defaultValue: '{"sunday": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, ' +
    '0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, ' +
    '0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, ' +
    '0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]}',
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

module.exports = Schedule;