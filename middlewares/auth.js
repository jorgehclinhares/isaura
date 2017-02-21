var jwt       = require('jsonwebtoken'),
    Client    = require('../src/models/Clients'),
    rn        = require('random-number'),
    hash      = require('hash-generator'),
    exports   = module.exports;

// Verificar validade do Token
exports.isAuthenticated = function(req, res, next) {

  var headers  = req.headers.authorization;
  var token    = null;

  if(!headers){
    return res.status(400).json({
      message: 'Erro(s) de requisição'
    });
  }

  var bearer = headers.split(' ')[0].toLowerCase().trim();

  if(bearer !== "bearer") {
    return res.status(400).json({
      message: 'Erro(s) de requisição'
    });
  }

  token = headers.split('Bearer').pop().trim();
  
  Client.verifyToken(token, "cufFz2Y7q734w011c3fMgOmje2XN4SH6", function(err, decoded){

    if (err) {

      if (err.name == 'TokenExpiredError') {
        return res.status(401).json({
          mensagem: 'Token expirado'
        });
      } else {
        return res.status(401).json({
          mensagem: 'Cliente não autorizado'
        });
      }

    } else {
      next();
    }

  });

}

// Cadastro
exports.signup = function (req, res, next) {

    let data = req.body.data;

    if(!data || !data.name) { 
      return res.status(400).json({
        message: 'Erro(s) de parâmetro(s)'
      });
    }

    let random      = rn({ min: 30, max: 35, integer: true });
    data.secret     = hash(random).toUpperCase();

    Client.generateToken(data, "cufFz2Y7q734w011c3fMgOmje2XN4SH6", function(err, token) {

      if (err) {
        return res.status(202).json({
          message: 'Credenciais inválidas'
        });
      }

      data.token = token;

      Client.signup(data, function(err, client) {

        if (err) {
          return res.status(202).json({
            message: 'Credenciais inválidas'
          });
        } else {
          return res.status(200).json({
            message: 'Cliente Cadastrado',
            data: client
          });
        }

      });

    });

}

// Atualizar token
exports.refreshToken = function (req, res, next) {

  let data = req.body.data;
  data._id  = req.params._id;

  if(!data && !data.secret || !data._id) {
    return res.status(400).json({
      message: 'Erro(s) de parâmetro(s)'
    });
  }

  Client.get(data, function(err, client) {

    if (!client) {
      return res.status(404).json({
        message: 'Cliente não identificada'
      });
    }

    if (err) {
      return res.status(500).json({
        message: 'Erro Interno'
      });
    }

    Client.generateToken(data, "cufFz2Y7q734w011c3fMgOmje2XN4SH6", function(err, token) {

      if (err) {
        return res.status(202).json({
          message: 'Credenciais inválidas'
        });
      }

      Client.update({ _id: client._id, token: token }, function (err, client) {

        if (err) {
          return res.status(500).json({
            message: 'Erro Interno'
          });
        }

        return res.status(200).json({
          message: 'Token atualizado com sucesso',
          data: client
        });

      });

    });

  });

}