var express = require('express')
  , session = require('express-session')
  , bodyParser = require('body-parser')
  , cookieParser = require('cookie-parser')
  , passport = require('passport')
  ;

var server = express()
  , port = process.env.PORT || 3001
  ;

require('./app/passport')(passport);

server.use(cookieParser());
server.use(bodyParser.urlencoded({extended: true}));
server.use(bodyParser.json({limit: '100mb'}));

server.use(session({secret: 'secret', saveUninitialized: true, resave: true}));
server.use(passport.initialize());
server.use(passport.session());

server.use(express.static(__dirname + '/public'));

// Routes ======================================================================
server.post('/register', passport.authenticate('register', {
  successRedirect: '/user',
  failureRedirect: '/'
}));

server.post('/login', passport.authenticate('login', {
  successRedirect: '/user',
  failureRedirect: '/'
}));

server.get('/', function (req, res) {
  res.sendFile('public/views/index.html', {root: __dirname});
});

// Start server ================================================================
server.listen(port);

module.exports = server;