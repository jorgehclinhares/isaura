var mongoose  = require('mongoose'),
    jwt       = require('jsonwebtoken'),
    exports   = module.exports;

var ProjectSchema = new mongoose.Schema({
  idBot:        { type: String, require: true },
  name:         { type: String, require: true },
  url:          { type: String, require: true }
});

var Project =  mongoose.model('Project', ProjectSchema);

exports.signup = function(data, cb) {
  
  Project.insertMany(data, function(err, projects){
    
    if(err){
      callback(true);
      return;
    }
    
    callback(false, projects);

  });

};