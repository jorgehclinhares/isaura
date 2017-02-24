var natural               = require('natural'),
    classify              = require('./classify.json'),
    extractor             = require('./extractor.js'),
    exports               = module.exports;

exports.classify = function (query) {

  var classifier  = new natural.BayesClassifier();
  var extract = [];

  query = extractor.extract(query, {
    lowercase: true,
    accent: true,
    tokenizer: true,
    stemmering: true
  });
  
  if(typeof query == 'object') {
    query = query[0];
  }
  
  for (let i = 0; i < classify.core.length; i++) {
    extract.push(classify.core[i].word);
  }

  extract = extractor.extract(extract, {
    lowercase: true,
    accent: true,
    tokenizer: true,
    stemmering: true
  });

  for (let i = 0; i < classify.core.length; i++) {
    classifier.addDocument(extract[i], classify.core[i].classify);
  }

  classifier.train();

  return classifier.classify(query);

}