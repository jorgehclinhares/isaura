var mongoose  = require('mongoose'),
    jwt       = require('jsonwebtoken'),
    exports   = module.exports;

var ProjectSchema = new mongoose.Schema({
  idBot:        { type: String, require: true },
  url:          { type: String, require: true }
});

var Project =  mongoose.model('Project', ProjectSchema);

exports.registry = function(data, cb) {
  
  let project = new Project(data);

  project.save(function(err, project) {

    if(err) {
      cb(true, err);
    } else {

      let _project = {
        type: "projects",
        _id: project._id,
        url: project.url
      };

      cb(false, _project);
    }

  });

};

exports.find = function(data, cb) {

  if(data.all) {

    Project.find({}, function(err, projects) {

      if(err) {
        cb(true, err);
      } else {

        let _projects = [];

        for(let i = 0; i < projects.length; i++) {
          _projects.push({
            type: "projects",
            _id: projects[i]._id,
            url: projects[i].url
          });
        }

        cb(false, _projects);
      }

    });

  } else {

    Project.findOne({
      url: data.url
    }, function(err, project) {

      if(err) {
        cb(true, err);
      } else {

        let _project = {};

        if(project) {
          _project = {
            type: "projects",
            _id: project._id,
            url: project.url
          };
        }

        cb(false, _project);
      }

    });

  }

};

exports.delete = function(id, cb) {

  Project.remove({ '_id' : id }, function (err, project) {

    if (err) {
      cb(true, {});
    } else {
      cb(false, {
        deleted: true
      });
    }

  });

};