var express     = require('express'),
    router      = express.Router(),
    Jobs        = require('../models/Jobs'),
    Auth        = require('../../middlewares/auth')

router.post('/v1.0/app/signup', Auth.signup);
router.put('/v1.0/app/:_id/token/refresh', Auth.refreshToken);

module.exports = router;
