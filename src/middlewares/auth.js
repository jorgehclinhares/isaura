var jwt       = require('jsonwebtoken'),
    App       = require('../models/Application'),
    Env       = require('../../config/envroiment'),
    crypto    = require('../libs/crypto'),
    jwt       = require('jsonwebtoken');

// Cadastro
module.exports.registerApp = function (req, res, next) {

    let data = req.body.data;

    let env = Env.get();

    if(!data || !data.name) { 
      return res.status(400).json({
        message: 'Erro(s) de parâmetro(s)'
      });
    }

    data.secret = crypto.hash(100, next);

    App.register(data)
      .then((App) => {
        res.status(200).send({
          data: App
        });
      })
      .catch((err) => {
        next(err);
      });
 
}

module.exports.generateToken = (data, secret) => {

  return new Promise ((resolve, reject) => {
    
    let token = jwt.sign({ "appId": data.appId, "secret": data.secret }, secret, { expiresIn : '1h' });

    if(token) return resolve(token);
    reject('invalid_generate_token');

  });

};

module.exports.verifyToken = (token, secret) => {

  return new Promise ((resolve, reject) => {
    
    jwt.verify(token, secret, (err, decoded) => {
      if(err) return reject('invalid_token');
      resolve(decoded);
    });

  });

};