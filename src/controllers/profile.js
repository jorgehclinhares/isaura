// Config
const Env             = require('../../config/envroiment');
// Models
const University      = require('../models/University');
// Libs
const Crypto          = require('../libs/crypto');

module.exports.getKey = (req, res, next) => {

  let env = Env.get();
  let crypto = Crypto.cipher("ISAURA", env.crypto.secret, env.crypto.algoritm);

  if (crypto.err) {
    res.status(500).send({
      "error": "Erro interno",
    });
  }

  res.status(200).send({
    "userKey": crypto.hash
  });
    
}
