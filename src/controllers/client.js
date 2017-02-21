var express     = require('express'),
    router      = express.Router(),
    Auth        = require('../../middlewares/auth'),
    Project     = require('../models/Projects');

router.post('/v1.0/app/signup', Auth.signup);
router.put('/v1.0/app/:_id/token/refresh', Auth.refreshToken);
router.get('/v1.0/app/:_id/query', Auth.refreshToken, processQuery);

function processQuery (req, res) {
    
    let query = req.query.q;

    if(!query || query !== "") { 
        return res.status(400).json({
        message: 'Query inválida'
        });
    }

    signupProject(data, function (err, projects) {
        
    });

}

function signupProject (data, cb) {
    
    let data = req.body.data;
    data._id  = req.params._id;

    if(!data) { 
      return res.status(400).json({
        message: 'Erro(s) de requisição'
      });
    }

    Project.signup(data, function(err, projects) {
      
    });

}

module.exports = router;
