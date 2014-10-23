var LocalStrategy = require('passport-local').Strategy
  , db = require('./db')
  ;

function authenticate (passport) {
  var User = db.getCollection('users');

  passport.serializeUser(function (user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
      done(err, user);
    })
  });

  passport.use('register', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
  },
  function (req, email, password, done) {
    process.nextTick(function () {
      User.findOne({'email': email}, function (err, user) {
        if (err) return done(err);

        if (user) {
          return done(null, false);
        } else {
          var newUser = User();
          newUser.email = email;
          newUser.password = newUser.generateHash(password);
          newUser.save(function (err) {
            if (err) throw err;
            return done(null, newUser);
          })
        }
      })
    })
  }));

  passport.use('login', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
  },
  function (req, email, password, done) {
    User.findOne({'email': email}, function (err, user) {
      if (err) return done(err);
      if (!user) return done(null, false);
      if (!user.validPassword(password))
        return done(null, false);
      return done(null, user);
    })
  }))
}

module.exports = authenticate;
