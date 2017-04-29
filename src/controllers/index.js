const express         = require('express'),
      request         = require('request');
      router          = express.Router(),
      relationships   = require('../relationships');

// Config
const Env                 = require('../../config/envroiment');


// Models
const University      = require('../models/University');

// Libs
const Crypto          = require('../libs/crypto');

// Endpoints

router.get('/me', introduceYourself);

router.get('/search/sms', searchSocialMachines);

router.get('/university/enroll', 
  getKey,
  enrollUniversity);

// Callbacks

function introduceYourself (req, res) {

  let env = Env.get();
  let crypto = Crypto.cipher("ISAURA", env.crypto.secret, env.crypto.algoritm);

  if (crypto.err) {
    res.status(500).send({
      "error": "Desculpe, estamos com um problema interno!",
    });
  }

  res.status(200).send({
    "message": "Eu sou uma máquina social e Jorge Linhares.",
    "key": crypto.hash
  });
}

function searchSocialMachines (req, res) {
  request({
    method: 'GET',
    uri: 'http://localhost:8080/'
  }, function (_err, _res, body) {

    if (_err) return next(_err);

    if (_res.statusCode === 200) {

      let data = JSON.parse(body);

      res.status(200).send({
        data: [data]
      });

    } else {
      res.status(_res.statusCode).send({
        error: "Não foi possível encontrar nenhuma máquina social"
      });
    }

  });
}

function getKey (req, res, next) {

  let env = Env.get();
  let key = generateKey('http://localhost:8181', env.crypto.secret, new Date());

  console.log(key);

  if (key.err) return next(key.err);

  req.body.key =  key;
  next();
}

function enrollUniversity (req, res, next) {

  let data = {
    fullname: "Jorge Henrique Cordeiro Linhares",
    courseId: "58fd062661dd2a0aaa455a62",
    key: req.body.key.encrypted
  }

  request({
    method: 'POST',
    headers: {'content-type' : 'application/json'},
    url:     'http://localhost:8080/student/enroll',
    body:    data,
    json:    true
  }, function (_err, _res, body) {

    if (_err) return next(_err);

    if (_res.statusCode === 200) {

      let data = JSON.parse(body);
      
      console.log('chegou');

      University.register(data)
        .then((university) => {
          res.status(200).send({
            message: "Matrícula realizada com sucesso!"
          });
        })
        .catch((err) => {
          next(err);
        });

    } else {
      res.status(_res.statusCode).send({
        error: "Não foi possível estabelecer este relacionamento"
      });
    }

  });
  
}

function generateKey (host, secret, expire) {
  let env = Env.get();
  let data = `http://localhost:8080.${host}.${expire}`;
  return Crypto.cipher(data, secret, env.crypto.algoritm);
}

module.exports = router;