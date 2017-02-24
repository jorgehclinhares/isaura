var natural               = require('natural'),
    PortugueseStemmer     = require('snowball-stemmer.jsx/dest/portuguese-stemmer.common.min.js').PortugueseStemmer,
    stopwords             = require('keyword-extractor')
    exports               = module.exports;

exports.extract = function (data, options) {

  var config        =  {};
  var tokenizer     = new natural.WordTokenizer();
  var stemmer       = new PortugueseStemmer();
  var documents     = [];

  if (!(data instanceof Array)) {
    data = [data];
  }

  for (var i = 0; i < data.length; i++) {
    documents.push(data[i]);
  }

  if(!options || options == "") {

    config = {
      lowercase:    true,
      accent:       true,
      characters :  true,
      tokenizer:    true,
      stemmering :  true,
      stopwords:    true
    };

  } else {

    config.lowercase   = options.lowercase   || false;
    config.accent      = options.accent      || false;
    config.characters  = options.characters  || false;
    config.tokenizer   = options.tokenizer   || false;
    config.stemmering  = options.stemmering  || false;
    config.stopwords   = options.stopwords   || false;

  }

  for (var i = 0; i < documents.length; i++) {

    if (config.lowercase) {
      documents[i] = documents[i].toLowerCase();
    }

    if (config.stopwords) {

      var sentence = documents[i];

      sentence = stopwords.extract(sentence, {
        language: "portuguese",
        remove_digits: false,
        return_changed_case: true,
        remove_duplicates: false
      });

      if ((sentence instanceof Array) && (sentence.length > 0)) {
        sentence = sentence.toString();
        documents[i] = sentence.replace(/,/gi, " ");
      }

    }

    if(config.accent){
      documents[i] = removeAceents(documents[i]);
    }

    if(config.characters){
      documents[i] = documents[i].replace(/[^a-z A-Z 0-9]/g,'');
    }

    if (config.tokenizer) {

      if(!config.characters) {
        tokenizer = new natural.WordPunctTokenizer();
        documents[i] = tokenizer.tokenize(documents[i]);
      } else {
        documents[i] = tokenizer.tokenize(documents[i]);
      }

    }

    if(config.stemmering) {

      if(!config.tokenizer){

        tokenizer = new natural.WordPunctTokenizer();
        var tokens  = tokenizer.tokenize(documents[i]);

        for (var y = 0; y < tokens.length; y++) {
          tokens[y] = stemmer.stemWord(tokens[y]);
        }

        tokens = tokens.toString();
        tokens = tokens.replace(/,/gi, " ");
        documents[i] = tokens;

      } else {

        var stemm = documents[i];

        for (var y = 0; y < stemm.length; y++) {
          stemm[y] = stemmer.stemWord(stemm[y]);
        }

        documents[i] = stemm;

      }

    }

  }

  return documents;

}

function removeAceents (query){
  var expression = null;

  var lettersMap 	= {
    a : /[\xE0-\xE6]/g,
    e : /[\xE8-\xEB]/g,
    i : /[\xEC-\xEF]/g,
    o : /[\xF2-\xF6]/g,
    u : /[\xF9-\xFC]/g,
    c : /\xE7/g,
    n : /\xF1/g
  };

  for (var letter in lettersMap) {
    expression = lettersMap[letter];
    query = query.replace(expression, letter);
  }

  return query;
}