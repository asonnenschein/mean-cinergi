var mongoose = require('mongoose')
  , bcrypt = require('bcrypt-nodejs')
  ;

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

userSchema.methods.generateHash = function (password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

userSchema.methods.validPassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};

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

exports.getCollection = getCollection;