var exports = module.exports,
    request = require('request'),
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
  
      let _projects = projects;
      let countRequests = 0;

      for(let i = 0; i < _projects.length; i++) {
        
        request.get(_projects[i].url, function(err, res) {

          countRequests++;

          if(!err) {
            _projects[i].statusCode = res.statusCode;
          }

          if(countRequests === _projects.length) {
            cb(false, _projects);
          }

        })
        .on('error', function(err) {
          console.log(err);
        });
      }
      
    }); 

  }

};
