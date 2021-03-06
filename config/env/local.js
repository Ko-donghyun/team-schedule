
// 모듈 의존 리스트
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const User = require('./../../model/user');

module.exports = function() {

  passport.serializeUser(function (user, done) {
    done(null, user);
  });

  passport.deserializeUser(function (user, done) {
    done(null, user);
  });

  // Local strategy 사용
  passport.use(new LocalStrategy({
      usernameField: 'email',
      passwordField: 'password'
    }, function(username, password, done) {
      User.findOne({ where: { email: username }}).then((user) => {
        if (!user) {
          return done(null, false, { message: 'Incorrect username.' });
        }

        if (!user.validPassword(password)) {
          return done(null, false, { message: 'Incorrect password.' });
        }

        return done(null, user);
      });
    }
  ));

};