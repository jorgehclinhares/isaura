
const Relationship = require('../models/Relationship'),
Crypto = require('../libs/crypto'),
Env = require('../../config/envroiment.js');

module.exports.me = (req, res, next) => {

  Relationship.getAll()
    .then((relationships) => {

      let env = Env.get();
      let crypto = Crypto.cipher("ISAURA/JORGEHCLINHARES", env.crypto.secret, env.crypto.algoritm);

      if (crypto.err) {
        res.status(500).send({
          "error": "Desculpe, estamos com um problema interno!",
        });
      }

      res.status(200).send({
        "message": "Eu sou uma máquina social e represento a Universidade Federal Rural de Pernambuco (UFRPE).",
        "key": crypto.hash,
        "relationships": relationships
      });

    })
    .catch((err) => next(err));

}

module.exports.getKey = (req, res, next) => {

  let env = Env.get();
  let crypto = Crypto.cipher("ISAURA/JORGEHCLINHARES", env.crypto.secret, env.crypto.algoritm);
  
  if (crypto.err) {
    res.status(500).send({
      "error": "Erro interno",
    });
  }

  res.status(200).send({
   "key": crypto.hash
  });

}