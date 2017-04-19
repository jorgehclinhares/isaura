const express         = require('express'),
      relationships   = require('../contracts/relationships'),
      router          = express.Router();

// endpoints
router.get('/', introduceYourself);

function introduceYourself (req, res) {
  res.status(200).send({
    "message": "Eu sou uma máquina social e represento Jorge Linhares",
    "realationships": relationships
  });
}

module.exports = router;