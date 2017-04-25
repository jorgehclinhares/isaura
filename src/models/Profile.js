const mongoose  = require('mongoose');


const ProfileSchema = new mongoose.Schema({
  fullname:   { type: String },
  documents:  [{
    type:       { type: String },
    value:      { type: String }
  }],
  birthday:   { type: Date },
  adress: {
    street: { type: String },
    number: { type: String },
    neighborhood: { type: String },
    city: { type: String },
    state:  { type: String },
    country:  { type: String },
    postalCode: { type: String }
  }
});

const Profile =  mongoose.model('Profile', ProfileSchema);

// Exports

module.exports.register = (data) => {

  let profile = new Profile(data);

  return new Promise ((resolve, reject) => {
   
    profile.save((err, profile) => {
      if (err) return reject(err);
      resolve (profile);
    });

  });

};

module.exports.get = (enrollId) => {

  return new Promise ((resolve, reject) => {
    Profile.findOne({}, (err, profile) => {
      if (err) return reject (err);
      resolve (profile);
    });
  });

};

module.exports.certificateDocumentsKey = (key) => {

  return new Promise ((resolve, reject) => {

    Profile.findOne({ key: key }, (err, profile) => {
      if (err) return reject(err);
      resolve(profile);
    });

  });

};