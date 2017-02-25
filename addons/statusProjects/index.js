var exports = module.exports,
    request = require('request'),
    async   = require('async'),
    npl     = require('../../core/natural_processing'),
    Project = require('../../src/models/Project');

exports.main = function(query, cb) {

  let _query = query.split(" ");
  let url = null;
  let name = null;

  let action = npl.extractor(_query[0], {
    lowercase:    true,
    accent:       true,
    stemmering :  true,
    stopwords:    true
  }).toString();

  if(action == "add" || action == "adicion" || action == "salv") {
    
    Project.registry({
      url:  _query[2],
    }, cb);

  } else if (action == "remov" || action == "delet" || action == "excluir") {

    Project.find({
      url: _query[2]
    }, function(err, project) {
      

      if(err || project == "") return cb(true, {});
      Project.delete(project._id, cb);

    });

  } else {

    Project.find({
      url: _query[2],
      all: true
    }, function(err, projects) {
  
      let urls = [];
      let _projects = [];

      for(let i = 0; i < projects.length; i++) {
        urls.push(projects[i].url);
      }

      async.eachSeries(urls, function (url, next) {
        request(url, function (err, res, body) {
          if(res) {
            _projects.push({
              url: url,
              statusCode: res.statusCode
            });
          } else {
            _projects.push({
              url: url,
              statusCode: 404
            });
          }
          
          next();
        })
      }, function(err) {
        return cb(false, _projects);
      });

    }); 

  }

};
