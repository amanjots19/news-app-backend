const User = require('../mongoSchema/User')
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');

module.exports = function (passport) {
    passport.use(
      new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password'
    },(email, password, done) => {
        User.findOne({ email: email }, (err, user) => {
            if (err) throw err;
            if (!user) return done(null, false);
            bcrypt.compare(password, user.password, (err, result) => {
                if (err) throw err;
                if (result === true) {
                    return done(null, user);
                } else {
                    return done(null, false);
            }
          });
        });
      })
    );
  
    passport.serializeUser((user, cb) => {
      cb(null, user.id);
    });
    passport.deserializeUser((id, cb) => {
      User.findOne({ _id: id }, (err, user) => {
        const userInformation = {
          username: user.name,
        };
        cb(err, userInformation);
      });
    });
  };