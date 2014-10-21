var express = require('express')
  , bodyParser = require('body-parser')
  ;

var server = express()
  , port = process.env.PORT || 3001;

server.use(bodyParser.urlencoded({extended: true}));
server.use(bodyParser.json({limit: '100mb'}));

server.use(express.static(__dirname + '/public'));

// routes ======================================================================



server.get('*', function (req, res) {
  res.sendFile('public/views/index.html', {root: __dirname});
});

// start server ================================================================
server.listen(port);

module.exports = server;