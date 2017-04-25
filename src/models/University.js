const mongoose  = require('mongoose');

const UniversitySchema = new mongoose.Schema({
  enrollId:   { type: String },
  courseId:   { type: String },
  entry:      { type: Date }
});

const University =  mongoose.model('University', UniversitySchema);

// Exports

module.exports.register = (data) => {

  let university = new University(data);

  return new Promise ((resolve, reject) => {
   
    university.save((err, university) => {
      if (err) return reject(err);
      resolve (university);
    });

  });

};

module.exports.get = (enrollId) => {

  return new Promise ((resolve, reject) => {
    University.findOne({}, (err, university) => {
      if (err) return reject (err);
      resolve (university);
    });
  });

};