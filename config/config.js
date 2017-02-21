var envDev    = require('./env.development.json'),
    envProd   = require('./env.production.json'),
    exports   = module.exports;

exports.env = function(){

  switch(process.env.NODE_ENV) {

    case 'development':
      return envDev;

    case 'production':
      return envProd;

    default:
      return {};

  }

};
