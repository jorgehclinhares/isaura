var exports   = module.exports,
    fs = require('file-system'),
    addonsConfig  = require('../../addons/addons.json');

exports.load = function load(list) {

  var list__files = [];

  for (var i = 0; i < list.length; i++) {
    list__files.push(readFiles(list[i]));
  }

  return list__files;

}

function readFiles(dir) {

  var path = require("path").join(__dirname, "../" + dir);

  var files = [];

  require("fs").readdirSync(path).forEach(function(file) {
    files.push("./src/" + dir + "/" + file);
  });

  return files;

};
