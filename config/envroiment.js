var envDev    = require('./env.development'),
    envProd   = require('./env.production');

module.exports.get = () => {

  switch(process.env.NODE_ENV) {

    case 'production':
      return envProd;

    default:
      return envDev;

  }

};