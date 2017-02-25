var exports     = module.exports,
    Classifier  = require('./classifier'),
    Extractor   = require('./extractor'),
    EvEmitter   = require('events'),
    addons      = require('../../addons/addons.json');

const Emitter = new EvEmitter();

exports.init = function(query, cb) {

  let classify  = Classifier.classify(query);
  let modules   = addons.modules;
  let _query    = query;
  let _cb       = cb;

  for(let i = 0; i < modules.length; i++) {
    Emitter.on(modules[i].name, function() {
      return require(('../../addons/' + modules[i].name)).main(_query, _cb);
    });
  }

  Emitter.emit(classify);

}

exports.extractor = function (data, options){
  return Extractor.extract(data, options);
}
exports.classify  = function (data) {
  return Classifier.classify(data);
}