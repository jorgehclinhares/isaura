// Modules
const express       = require('express'),
      app           = express(),
      bodyParser    = require('body-parser'),
      mongoose      = require('mongoose');

// Libs
const Filer         = require('./src/libs/filer'),
      Env           = require('./config/envroiment');

(function initApi () {

  let env = Env.get();

  if (Object.keys(env).length == 0) {
    return console.log("Ambiente não foi determinado.");
  }

  app.use( bodyParser.json() );
  app.use( bodyParser.urlencoded({ extended: true }) );
 
  connectDatabase();

  loadControllers();

  app.listen(env.port, (err) => {
    if(err)  return console.log(`${new Date()} | Serviço não disponível`);
    console.log(`${new Date()} | Servidor disponível ${env.host}:${env.port}`);
  });

  app.use(logErrors);
  app.use(errorHandler);

})();

function loadControllers () {

  try { 

    let controllers = Filer.load( [ "controllers" ] );

    for (let i = 0; i < controllers.length; i++) {
      for (let y = 0; y < controllers[i].length; y++) {
        app.use(require(controllers[i][y]));
      }
    }
  } catch (err) {
    console.error(`${new Date()} | ERR: `, err);
  }
  
}

function logErrors(err, req, res, next) {

  console.error(`${new Date()} | ERR: `, err.stack || err);
  next(err);
}

function errorHandler (err, req, res, next) {

  if (typeof err == "string") {
    if (err == "broken_contract") {
      return res.status(401).send({ error: 'Contrato invlálido ou quebrado' });
    } 
  }

  res.status(500).send({ error: 'Erro interno' });
  
}

function connectDatabase() {
  mongoose.connect('mongodb://localhost/isaura', (err) => {
    if(err) next(err);
    console.log(`${new Date()} | Banco de dados disponível`);
  });
}