var express = require("express");
var router = express.Router();
const appController = require("./../controllers/appController");
const AppError = require("./../utils/appError");

const handleAuthorization = (role) => {
  return (req, res, next) => {
    if (role != "admin") {
      return next(new AppError("You dont have authorization", 403));
    }
    next();
  };
};

// ADMIN
// get all ads
// post data ads
router
  .route("/")
  .get(handleAuthorization("admin"), appController.getAllAds)
  .post(
    handleAuthorization("admin"),
    appController.uploadAdsImage,
    appController.addAds,
    appController.sendToClient
  );

// ADMIN
// get data by id ads
// update data by id ads
// USER
// get data by id ads
router
  .route("/:id")
  .get(appController.getOneAds)
  .delete(
    handleAuthorization("admin"),
    appController.getImageDatabaseAndRemove,
    appController.uploadAdsImage,
    appController.deleteOneAds
  )
  .patch(
    handleAuthorization("admin"),
    appController.getImageDatabaseAndRemove,
    appController.uploadAdsImage,
    appController.updateAds,
    appController.sendToClient
  );

module.exports = router;
