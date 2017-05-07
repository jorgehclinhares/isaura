
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
        "message": "Eu sou uma máquina social e represento um aluno.",
        "key": crypto.hash,
        "relationships": relationships
      });

    })
    .catch((err) => next(err));

}