var express = require('express'),
    app = express(),
    Loader = require("./src/libs/loader"),
    Config = require("./config/config");

(function initApi() {

  const config = Config.env();

  if(!config || config == ""){
    console.log("# Ambiente não setado");
    return;
  }

  // Engine - View
  app.set('views', __dirname + '/src/views');
  app.set('view engine', 'pug');

  // Load - Controllers
  var files = Loader.load(["controllers"]);

  for (var i = 0; i < files.length; i++) {
    for (var y = 0; y < files[i].length; y++) {
      app.use(require(files[i][y]));
    }
  }

  // Start - App Service
  app.listen(config.port, startService);


})();


function startService() {
  console.log('Serviço Online');
}