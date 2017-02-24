var exports     = module.exports,
    Classifier  = require('./classifier'),
    Extractor   = require('./extractor');

exports.extractor = function (data, options){
  return Extractor.extract(data, options);
}
exports.classify  = function (data) {
  return Classifier.classify(data);
}