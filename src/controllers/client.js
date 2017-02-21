var express     = require('express'),
    router      = express.Router(),
    Jobs        = require('../models/Jobs'),
    Auth        = require('../../middlewares/auth')

router.post('/v1.0/app/signup', Auth.signup);

module.exports = router;
