
const Sequelize = require('sequelize');

const sequelize = require('./../config/env/sequelize.js');

const Schedule = sequelize.define('schedule', {
  monday: {
    type: Sequelize.STRING,
    allowNull: false,
    defaultValue: '[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, ' +
    '0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]',
  },
  tuesday: {
    type: Sequelize.STRING,
    allowNull: false,
    defaultValue: '[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, ' +
    '0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]',
  },
  wednesday: {
    type: Sequelize.STRING,
    allowNull: false,
    defaultValue: '[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, ' +
    '0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]',
  },
  thursday: {
    type: Sequelize.STRING,
    allowNull: false,
    defaultValue: '[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, ' +
    '0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]',
  },
  friday: {
    type: Sequelize.STRING,
    allowNull: false,
    defaultValue: '[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, ' +
    '0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]',
  },
  saturday: {
    type: Sequelize.STRING,
    allowNull: false,
    defaultValue: '[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, ' +
    '0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]',
  },
  sunday: {
    type: Sequelize.STRING,
    allowNull: false,
    defaultValue: '[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, ' +
    '0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]',
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