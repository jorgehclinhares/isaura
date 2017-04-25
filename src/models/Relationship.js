const mongoose  = require('mongoose');

const ConstraintSchema = new mongoose.Schema({
  required: {
    params:   mongoose.Schema.Types.Mixed,
    headers:  mongoose.Schema.Types.Mixed,
    body:     mongoose.Schema.Types.Mixed,
    query:    mongoose.Schema.Types.Mixed
  }
});

const RelationshipSchema = new mongoose.Schema({
  name:         { type: String, unique: true },
  key:          { type: String, unique: true },
  request: { 
    method:     { type: String, uppercase: true },
    endpoint:   { type: String }
  },
  expire:       { type: Date },
  contracts:    [ ConstraintSchema ]
});

const Relationship =  mongoose.model('Relationship', RelationshipSchema);

module.exports.register = (data) => {

  let relationship = new Relation (data);

  return new Promise ((resolve, reject) => {
   
    relationship.save((err, relationship) => {
      if (err) return reject (err);
      resolve (relationship);
    });

  });

};

module.exports.getAll = () => {

  return new Promise ((resolve, reject) => {
    Relation.find({}, '_id request token constraints' , (err, relationships) => {
      if (err) return reject (err);
      return resolve (relationships);
    });
  });

};