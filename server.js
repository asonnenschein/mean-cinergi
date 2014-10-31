var express = require('express')
  , session = require('express-session')
  , bodyParser = require('body-parser')
  , cookieParser = require('cookie-parser')
  , passport = require('passport')
  , routes = require('./app/routes')
  ;

var server
  , port
  , auth
  ;

server = express();
port = process.env.PORT || 3001;

auth = function (req, res, next) {
  if (!req.isAuthenticated()) res.send(401);
  else return next();
};

require('./app/passport')(passport);

server.use(cookieParser());
server.use(bodyParser.urlencoded({extended: true}));
server.use(bodyParser.json({limit: '100mb'}));

server.use(session({secret: 'secret', saveUninitialized: true, resave: true}));
server.use(passport.initialize());
server.use(passport.session());

server.use(express.static(__dirname + '/public'));

// Routes ======================================================================
/********
 * POST *
 ********/
server.post('/user/register', passport.authenticate('register'), function (req, res) {
  res.send(req.user);
});

server.post('/user/login', passport.authenticate('login'), function (req, res) {
  res.send(req.user);
});

server.post('/organization/register', function (req, res, next) {
  return next();
}, routes.registerOrganization);

/*******
 * GET *
 *******/
server.get('/', function (req, res) {
  res.sendFile('public/views/index.html', {root: __dirname});
});

server.get('/user/loggedin', function (req, res) {
  res.send(req.isAuthenticated() ? req.user : '0');
});

server.get('/user/logout', function (req, res) {
  req.logOut();
  res.status(200).end();
});

// Start server ================================================================
server.listen(port);

module.exports = server;