var mongo = require('./db');

function registerOrganization (req, res, next) {
  var data;

  data = {
    name: req.body.name,
    owner: req.body.owner,
    about: req.body.about
  };

  mongo.createRecords('orgs', data, function (err) {
    if (err) return next(new Error(err));
    else return res.status(200).end();
  })
}

exports.registerOrganization = registerOrganization;