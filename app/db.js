var mongoose = require('mongoose');

// Configurations ==============================================================
var config
  , mongoUrl
  , userSchema
  , orgSchema
  , db
  ;

config = {dbHost: 'localhost', dbPort: '27071', dbName: 'cinergi-mgmt'};
mongoUrl = ['mongodb:/', config.dbHost, config.dbName].join('/');

userSchema = new mongoose.Schema({
  email: String,
  password: String
});

orgSchema = new mongoose.Schema({});

db = mongoose.connect(mongoUrl);

db.connection
  .on('error', function (err) {
    console.log('Error connecting to MongoDB', err);
  })
  .on('open', function () {
    console.log('Connected to MongoDB');
  });

function connectToMongoCollection (db, collection, schema) {
  return db.model(collection, schema);
}

function getCollection (collection) {
  switch (collection) {
    case 'users':
      return connectToMongoCollection(db, 'Users', userSchema);
      break;
    case 'orgs':
      return connectToMongoCollection(db, 'Organizations', orgSchema);
      break;
  }
}

// Methods =====================================================================