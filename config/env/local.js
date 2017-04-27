
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
      usernameField: 'nickname',
      passwordField: 'password'
    }, function(username, password, done) {
      User.findOne({ where: { nickname: username }}).then((user) => {
        console.log(user.nickname);
        if (!user) {
          return done(null, false, { message: 'Incorrect username.' });
        }

        if (!user.validPassword(password, user.salt)) {
          console.log('Bbbbd');
          return done(null, false, { message: 'Incorrect password.' });
        }

        return done(null, user);
      });
    }
  ));

};