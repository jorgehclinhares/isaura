const mongoose  = require('mongoose');

const RelationshipSchema = new mongoose.Schema({
  key: { type: String },
  name:  { type: String },
  detail: { type: String },
  constraints: [ {  name: String, description: String } ],
  expire: { type: Date },
  input: { /* JSON */ },
  output: { /* JSON */ }
});

const Relationship =  mongoose.model('Relationship', RelationshipSchema);

module.exports.register = (data) => {

  let relationship = new Relationship (data);

  return new Promise ((resolve, reject) => {
   
    relationship.save((err, relationship) => {
      if (err) return reject (err);
      resolve (relationship);
    });

  });

};

module.exports.getByKey = (key) => {

  return new Promise ((resolve, reject) => {
    Relationship.findOne({ key: key }, (err, relationship) => {
      if (err) return reject (err);
      resolve (relationship);
    });
  });

};