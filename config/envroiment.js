var envDev    = require('./env.development'),
    envProd   = require('./env.production');

module.exports.get = () => {

  switch(process.env.NODE_ENV) {

    case 'development':
      return envDev;

    case 'production':
      return envProd;

    default:
      return {};

  }

};