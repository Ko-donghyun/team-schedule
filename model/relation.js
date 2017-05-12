
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
User.hasMany(Group, {
  foreignKey: {
    allowNull: false
  },
  constraints: false
});
Group.belongsTo(User);
User.hasMany(UserGroup, {
  foreignKey: {
    allowNull: false
  },
  constraints: false
});
UserGroup.belongsTo(User);
Group.hasMany(UserGroup, {
  foreignKey: {
    allowNull: false
  },
  constraints: false
});
UserGroup.belongsTo(Group);

User.sync().then(function () {});

Schedule.sync().then(function () {});

Group.sync().then(function () {});

UserGroup.sync().then(function () {});