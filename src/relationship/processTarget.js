const profileCtrl  = require('../controllers/profile');

module.exports.main = (req, res, next) => {

 switch(req.relationship.name) {
    case "getKey":
        profileCtrl.getKey(req, res, next);
        break;
    default:
        next(true);
  }
  
}
