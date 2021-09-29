var express = require("express");
var router = express.Router();
const scriptController = require("./../controllers/scirptController");
const AppError = require("./../utils/appError");

const handleAuthorization = (role) => {
  return (req, res, next) => {
    if (role != "admin") {
      return next(new AppError("You dont have authorization", 403));
    }
    next();
  };
};
// update dan get script
router
  .route("/")
  .get(handleAuthorization("admin"), scriptController.getScript)
  .patch(handleAuthorization("admin"), scriptController.updateScript);

module.exports = router;
