const express         = require('express'),
      request         = require('request');
      router          = express.Router(),
      relationships   = require('../relationships'),
      request         = require('request');

// Models

const University      = require('../models/University');

// Endpoints

router.get('/', introduceYourself);

router.get('/university/enroll', enrollUniversity);

// Callbacks

function introduceYourself (req, res) {
  res.status(200).send({
    "message": "Eu sou uma máquina social e represento Jorge Linhares",
    "relationships": relationships
  });
}


function enrollUniversity (req, res) {

//   {
// 	"fullname": "Jorge Henrique Cordeiro Linhares",
// 	"courseId": "58fd062661dd2a0aaa455a62",
// 	"relationship": {
// 		"key": "GH231JDASKP852L3h",
// 		"host": "http://localhost:8181/profile",
// 		"name": "accessDataProfile"
// 	}
// }
  
  request({
    method: 'GET',
    uri: 'http://localhost:8181/'
  }, function (_err, _res, body) {

    if (_err) return next(_err);

    if (_res.statusCode === 200) {

      let data = JSON.parse(body);

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

module.exports = router;