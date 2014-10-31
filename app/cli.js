var program = require('commander')
  , async = require('async')
  , path = require('path')
  , exec = require('child_process').exec
  , request = require('request')
  , mongo = require('./db')
  ;

program
  .version('0.0.1a')
  .option('-i, --init', 'Populate application with sample data')
;

program.on('--help', function () {
  console.log('  Examples:');
  console.log('');
  console.log('    Initialize application with test data for development --');
  console.log('    $ cinergi-ui --init');
  console.log('');
});

program.parse(process.argv);

var queue = [];
if (program.init) queue.push(initialize);
async.series(queue);

function initialize () {
  console.log('Initializing application for development: START');
  async.waterfall([
    function (callback) {
      console.log('  -Delete collection: data');
      mongo.removeCollection('data', function (err) {
        if (err) callback(err);
        else callback(null);
      })
    },
    function (callback) {
      console.log('  -Delete collection: orgs');
      mongo.removeCollection('orgs', function (err) {
        if (err) callback(err);
        else callback(null);
      })
    },
    function (callback) {
      console.log('  -Delete collection: users');
      mongo.removeCollection('users', function (err) {
        if (err) callback(err);
        else callback(null);
      })
    },
    function (callback) {
      console.log('  -Transform xml to json: czo');
      var sampleXml = path.join(__dirname, '../test/sample-czo-iso.xml')
        , cmd = 'cat ' + sampleXml + ' | xml-to-cinergi -s -c'
        ;

      exec(cmd, function (err, stdout, stderr) {
        if (err) callback(err);
        if (stderr) callback(stderr);
        callback(null, stdout);
      })
    },
    function (data, callback) {
      console.log('  -Create records in MonogDB: czo');
      var json = JSON.parse(data);
      mongo.createRecords('data', json, function (err) {
        if (err) callback(err);
        else callback(null)
      })
    },
    function (callback) {
      console.log('  -Transform xml to json: hydro10');
      var sampleXml = path.join(__dirname, '../test/sample-hydro10-iso.xml')
        , cmd = 'cat ' + sampleXml + ' | xml-to-cinergi -s -h'
        ;

      exec(cmd, function (err, stdout, stderr) {
        if (err) callback(err);
        if (stderr) callback(stderr);
        callback(null, stdout);
      })
    },
    function (data, callback) {
      console.log('  -Created records in MongoDB: hydro10');
      var json = JSON.parse(data);
      mongo.createRecords('data', json, function (err) {
        if (err) callback(err);
        else callback(null)
      })
    },
    function (callback) {
      require('../server');
      var users
        , url
        ;

      url = 'http://localhost:3001/user/register';

      users = [
        {email: 'admin1@test.com', password: 'password'},
        {email: 'admin2@test.com', password: 'password'},
        {email: 'user1@test.com', password: 'password'},
        {email: 'user2@test.com', password: 'password'}
      ];

      function series (data) {
        if (data) {
          request.post({url: url, form: data}, function (err) {
            if (err) callback(err);
            series(users.shift());
          });
        }
        else {
          callback(null);
        }
      }
      series(users.shift());
    },
    function (callback) {
      require('../server');
      var orgs
        , url
        ;

      url = 'http://localhost:3001/organization/register';

      orgs = [
        {name: 'Arizona Geological Survey'},
        {name: 'Univeristy of California San Diego'}
      ];

      function series (data) {
        if (data) {
          request.post({url: url, form: data}, function (err) {
            if (err) callback(err);
            series(orgs.shift());
          });
        }
        else {
          callback(null);
        }
      }
      series(orgs.shift());
    }
  ], function (err) {
    if (err) throw err;
    console.log('Initializing application for development: SUCCESS');
    process.kill();
  })
}