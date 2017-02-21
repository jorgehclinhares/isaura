var express     = require('express'),
    app         = express(),
    bodyParser  = require('body-parser'),
    Loader      = require("./src/libs/loader"),
    mongoose    = require('mongoose'),
    Config      = require("./config/config");

(function initApi() {

  const config = Config.env();

  if(!config || config == ""){
    console.log("# Ambiente não setado");
    return;
  }

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  // Load - Controllers
  var files = Loader.load(["controllers"]);

  for (var i = 0; i < files.length; i++) {
    for (var y = 0; y < files[i].length; y++) {
      app.use(require(files[i][y]));
    }
  }
  connectDB();
  // Start - App Service
  app.listen(config.port, startService);


})();

function connectDB() {
  mongoose.connect('mongodb://localhost/isaura', function(err){
    if(err) {
      console.log("Não foi possível conectaro ao Banco de Dados");
    } else{
      console.log('Banco de Dados Online');
    }
  });
}

function startService() {
  console.log('Serviço Online');
}