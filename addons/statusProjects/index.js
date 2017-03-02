var exports = module.exports,
    request = require('sync-request'),
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
  
      for(let i = 0; i < projects.length; i++) {
        projects[i].statusCode = request('GET', projects[i].url).statusCode;
      }

      return cb(false, projects);

    }); 

  }

};
