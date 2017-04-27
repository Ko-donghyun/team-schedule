
const Sequelize = require('sequelize');

const sequelize = require('./../config/env/sequelize.js');

const User = sequelize.define('user', {
  nickname: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
  },
  encrypt_password: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  salt: {
    type: Sequelize.STRING,
    allowNull: false,
  },
}, {
  timestamps: true,
  paranoid: true,
  underscored: true,
  collate: 'utf8_unicode_ci',
  engine: 'InnoDB',
});

module.exports = User;