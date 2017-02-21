var mongoose  = require('mongoose'),
    exports   = module.exports;

var JobsSchema = new mongoose.Schema({
  idApp:    { type: String, require: true },
  time:     { type: String, require: true },
  action:   { type: String }
});

var Job =  mongoose.model('Job', JobsSchema);

exports.cadastrar = function(data, cb) {
    // Nothing
};
