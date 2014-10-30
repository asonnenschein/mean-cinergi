var mongoose = require('mongoose')
  , bcrypt = require('bcrypt-nodejs')
  ;

// Configurations ==============================================================
var config
  , mongoUrl
  , userSchema
  , orgSchema
  , metadataSchema
  , db
  ;

config = {dbHost: 'localhost', dbPort: '27071', dbName: 'cinergi-mgmt'};
mongoUrl = ['mongodb:/', config.dbHost, config.dbName].join('/');

/***************
 * User Schema *
 ***************/
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

/***********************
 * Organization Schema *
 ***********************/
orgSchema = new mongoose.Schema({});

/*******************
 * Metadata Schema *
 *******************/
metadataSchema = new mongoose.Schema({});

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
    case 'data':
      return connectToMongoCollection(db, 'Metadata', metadataSchema);
      break;
  }
}

function removeCollection (collection, callback) {
  var dbModel = getCollection(collection);
  dbModel.remove({}, function (err) {
    if (err) callback(err);
    callback(null, 'Removed collection:', collection);
  })
}

function createRecords (collection, data, callback) {
  var dbModel = getCollection(collection);
  dbModel.collection.insert(data, function (err, res) {
    if (err) callback(err);
    callback(null, res);
  })
}

// Methods =====================================================================
exports.getCollection = getCollection;
exports.removeCollection = removeCollection;
exports.createRecords = createRecords;