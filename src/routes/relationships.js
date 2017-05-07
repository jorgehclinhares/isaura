const express = require('express'),
      router = express.Router();

// Libs
const relationship = require('../relationship/manager'),
      processTarget = require('../relationship/processTarget');

// Controllers
const profileCtrl = require('../controllers/profile');

// Routes
router.get('/me', profileCtrl.me);
router.post('/rel/:key', relationship.loader, relationship.validate, relationship.emitter, processTarget.main);
router.get('/rel/:key', relationship.loader, relationship.validate, relationship.emitter, processTarget.main);
router.put('/rel/:key', relationship.loader, relationship.validate, relationship.emitter, processTarget.main);
router.delete('/rel/:key', relationship.loader, relationship.validate, relationship.emitter, processTarget.main);

module.exports = router;