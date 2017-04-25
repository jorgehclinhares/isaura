const express         = require('express'),
      request         = require('request');
      router          = express.Router();

// endpoints
router.get('/', introduceYourself);

// router.get('/sm/search', getSocialMachines);


function introduceYourself (req, res) {
  res.status(200).send({
    "message": "Eu sou uma máquina social e represento Jorge Linhares",
    // "realationships": relationships
  });
}


// function getSocialMachines (req, res) {
  
//   request.get('http://localhost:8181/', (err, res, body) => {
//     console.log(JSON.parse(res.body));



//   });
  
// }



module.exports = router;