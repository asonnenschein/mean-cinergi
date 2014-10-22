var passport = require('passport')
  , strategy = require('passport-local').Strategy
  , db = require('./db')
  ;

var User = db.getCollection('users');

passport.use('register', new strategy({
  usernameField: 'register-email',
  passwordField: 'register-password',
  passReqToCallback: true
},
function (req, email, password, done) {
  console.log(req);
  process.nextTick(function () {
    User.findOne({'email': email}, function (err, res) {
      if (err) return done(err);
      if (res) return done(null, false);
      var newUser = new User();
      newUser.email = email;
      newUser.password = newUser.generateHash(password);
      newUser.save(function (err) {
        if (err) throw err;
        return done(null, newUser);
      })
    })
  })
}));