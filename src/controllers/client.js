var express     = require('express'),
    router      = express.Router(),
    Auth        = require('../../middlewares/auth'),
    npl         = require('../../core/natural_processing');

router.post('/v1.0/app/signup', Auth.signup);
router.put('/v1.0/app/:_id/token/refresh', Auth.refreshToken);
router.get('/v1.0/app/:_id/query', Auth.isAuthenticated, processQuery);

function processQuery (req, res) {
    
    let query = req.query.q;

    if(!query || query == "") { 
      return res.status(400).json({
        message: 'Query inválida'
      });
    }

    npl.init(query, function(err, data) {
      return res.status(200).json({
        data: data
      });
    });

}

module.exports = router;
