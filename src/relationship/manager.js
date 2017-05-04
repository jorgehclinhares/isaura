// Modules
const util         = require("util"),
      EventEmitter = require("events").EventEmitter;
      
// Models
const Relationship = require('../models/Relationship');

// Libs
const constraintEvent = require('./constraintEvent');
      constraintEmitter = require('./constraints');

// Variables
var countConstraints = 0,
    constraintsPool = [];

// Exports

module.exports.loader = (req, res, next) => {

  if(!req.params.key) {
    return res.status(401).send({
      "error": "Não foi possível identificar a chave do relacionamento"
    });
  } 

  Relationship.getByKey(req.params.key)
    .then((relationship) => {

      if (!relationship) {
        return res.status(404).send({
          "error": "Não foi possível identificar o relacionamento."
        });
      }

      req.relationship = relationship;
      next();

    })
    .catch((err) => {
      next(err);
    });

}

module.exports.validate = (req, res, next) => {
  
  let relationshipInputs = req.relationship.input;
  let requestInputs = req.body;

  if (Object.keys(relationshipInputs).length == 0) {
    return next();
  }

  Array.prototype.diff = function (array) {
    return this.filter (function(i) {
      return array.indexOf(i) < 0
    });
  };
  
  let relationshipInputsProperties = Object.keys(relationshipInputs);
  let requestInputsProperties = Object.keys(requestInputs);

  let arrayDiff = relationshipInputsProperties.diff(requestInputsProperties);

  if (arrayDiff.length != 0) {
    return res.status(401).send({
      "error": "Contrato violado, inputs não foram respeitados."
    });
  }
  
  for (var   key in requestInputs) {
    if (requestInputs[key] == null  || requestInputs[key] == "") {
      return res.status(401).send({
        "error": "Contrato violado, input(s) vazio(s)."
      });
    }
  }

  next();

}

module.exports.emitter = (req, res, next) => {

  let constraints = req.relationship.constraints;

  if (constraints.length == 0) {
    return next();
  }
  
  countConstraints = constraints.length;

  // Callback que mapeia quando as restrições terminaram de ser validadas
  const done = (data) => {

    constraintsPool.push(data);
    countConstraints--;
    
    if (countConstraints == 0) {

      let isValidConstraints = true;

      for (let i = 0; i < constraintsPool.length; i++) {
        if (constraintsPool[i].invalid) {
          isValidConstraints = false;
          break;
        }
      }

      if (!isValidConstraints) {
        return res.status(401).send({
          "error": "Contrato violado, restrição(ões) não foi(ram) respeitada(s)."
        });
      }

      next();
      
    }
    
  }

  for (let i = 0; i < constraints.length; i++) {
    constraintEmitter.emit(constraints[i].name, done);
  }  

}
