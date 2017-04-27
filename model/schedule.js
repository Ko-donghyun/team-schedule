
const Sequelize = require('sequelize');

const sequelize = require('./../config/env/sequelize.js');

const Schedule = sequelize.define('schedule', {
  monday: {
    type: Sequelize.STRING,
    allowNull: false,
    defaultValue: '',
  },
  tuesday: {
    type: Sequelize.STRING,
    allowNull: false,
    defaultValue: '',
  },
  wednesday: {
    type: Sequelize.STRING,
    allowNull: false,
    defaultValue: '',
  },
  thursday: {
    type: Sequelize.STRING,
    allowNull: false,
    defaultValue: '',
  },
  friday: {
    type: Sequelize.STRING,
    allowNull: false,
    defaultValue: '',
  },
  saturday: {
    type: Sequelize.STRING,
    allowNull: false,
    defaultValue: '',
  },
  sunday: {
    type: Sequelize.STRING,
    allowNull: false,
    defaultValue: '',
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