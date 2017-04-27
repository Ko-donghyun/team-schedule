
const Sequelize = require('sequelize');
const crypto = require('crypto');

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
  instanceMethods: {
    // 비밀번호를 해시값으로 변경하는 메서드
    validPassword: function (password, salt) {
      if (!password || !salt)
        return '';
      salt = new Buffer(salt, 'base64');
      return crypto.pbkdf2Sync(password, salt, 10000, 64).toString('base64');
    },
  },
  timestamps: true,
  paranoid: true,
  underscored: true,
  collate: 'utf8_unicode_ci',
  engine: 'InnoDB',
});

module.exports = User;