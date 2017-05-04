const express         = require('express'),
      router          = express.Router();

// Libs
const Crypto              = require('../libs/crypto'),
      relationship        = require('../relationship/manager'),
      processTarget       = require('../relationship/processTarget');

// Config
const Env                 = require('../../config/envroiment');

// router.get('/me', introduceYourself); TODO: Adaptar ao novo conceito

// Relations Endpoints
router.post('/rel/:key',    relationship.loader, relationship.validate, relationship.emitter, processTarget.main);
router.get('/rel/:key',     relationship.loader, relationship.validate, relationship.emitter, processTarget.main);
router.put('/rel/:key',     relationship.loader, relationship.validate, relationship.emitter, processTarget.main);
router.delete('/rel/:key',  relationship.loader, relationship.validate, relationship.emitter, processTarget.main);

// TODO: função não usada no momento
function introduceYourself (req, res, next) {

  let env = Env.get();
  let crypto = Crypto.cipher("ISAURA", env.crypto.secret, env.crypto.algoritm);

  if (crypto.err) {
    res.status(500).send({
      "error": "Erro interno!",
    });
  }

  res.status(200).send({
    "message": "Eu sou uma máquina social e represento um aluno.",
    "key": crypto.hash
  });
  
}

module.exports = router;