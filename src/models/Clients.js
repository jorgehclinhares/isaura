var mongoose  = require('mongoose'),
    jwt       = require('jsonwebtoken'),
    exports   = module.exports;

var ClientSchema = new mongoose.Schema({
  name:           { type: String, require: true },
  secret:         { type: String, require: true, unique: true },
  token:          { type: String }
});

var Client =  mongoose.model('Client', ClientSchema);

exports.generateToken = function(data, serviceSecret, cb) {

  var token = jwt.sign({ "secret": data.secret, "name": data.name }, serviceSecret, { expiresIn : '3h' });

  if(token) {
    cb(false, token);
  } else {
    cb(true);
  }

};

exports.verifyToken = function(token, serviceSecret, cb) {
  jwt.verify(token, serviceSecret, function(err, decoded) {
    if(err) {
      cb(err);
    } else {
      cb(false, decoded);
    }
  });
};

exports.signup = function(data, cb) {

  let client = new Client(data);

  client.save(function(err, client) {

    if(err) {
      cb(true, err);
    }else {
      cb(false, client);
    }

  });

};

exports.update = function(data, cb) {

  Client.findById(data._id, function(err, client){

    if(err || !client){
      cb(true, err || client);
    } else {

      if (data.token) {
        client.token = data.token;
      }

      client.save(function(err, client){
        if(err){
          cb(true, err);
        } else {
          cb(false, client);
        }
      });

    }

  });

};

exports.get = function(data, cb) {

  Client.findOne({
    $and: [
      { 'secret' : data.secret },
      { '_id' : data._id }
    ]
  }, function (err, client) {

    if (err) {
      cb(true);
    } else {

      if(!client){
        cb(true);
      } else {
        cb(false, client);
      }

    }

  });

};