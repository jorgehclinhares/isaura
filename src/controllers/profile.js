// Modules
const express         = require('express'),
      router          = express.Router();

// Models

const Profile         = require('../models/Profile');

// Endpoints
router.get('/profile',
  getProfileData
);

// Callbacks
function getProfileData (req, res, next) {
  Profile.get()
    .then((profile) => {
      res.status(200).send({
        profile: profile
      });
    })
    .catch((err) => {
      next(err);
    });
}

module.exports = router;