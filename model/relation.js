
const User = require('./user');
const Schedule = require('./schedule');
const Group = require('./group');
const UserGroup = require('./userGroup');

User.hasOne(Schedule, {
  foreignKey: {
    allowNull: false
  },
  constraints: false
});
User.hasMany(UserGroup, {
  foreignKey: {
    allowNull: false
  },
  constraints: false
});
Group.hasMany(UserGroup, {
  foreignKey: {
    allowNull: false
  },
  constraints: false
});

User.sync().then(function () {});

Schedule.sync().then(function () {});

Group.sync().then(function () {});

UserGroup.sync().then(function () {});