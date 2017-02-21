var express     = require('express'),
    router      = express.Router();

router.get('/', initApi);

function initApi(req, res) {
  res.render('upload', { title: 'Hey', message: 'Hello there!' })
}

module.exports = router;
