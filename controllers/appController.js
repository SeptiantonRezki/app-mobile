const multer = require("multer");
const AppError = require("./../utils/appError");
const connection = require("./../configuration/database");
const fs = require("fs");
const path = require("path");

const multerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/img/ads");
  },
  filename: (req, file, cb) => {
    const ext = file.mimetype.split("/")[1];
    cb(null, `ads-${Date.now()}.${ext}`);
  },
});
const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb(new AppError("Not an image! Please upload only images.", 400), false);
  }
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

exports.uploadAdsImage = upload.single("imageAds");

const somethingDatabaseReturn = (error, results) => {
  if (error) {
    console.log("The solution is: ", results);
    return next(new AppError("Something Wrong Server", 500));
  }
};

// Admin
exports.addAds = (req, res, next) => {
  var query = "INSERT INTO ads_table (ads_url) VALUE (?)";
  var variableQuery = [req.body.url];
  console.log(req.file.filename);
  if (req.file) {
    query = "INSERT INTO ads_table (ads_url,image_url) VALUE (?, ?)";
    variableQuery.push(req.file.filename);
  }
  connection.query(query, variableQuery, function (error, results, fields) {
    somethingDatabaseReturn(error, results);
    req.params.id = results.insertId;
    next();
  });
};

exports.updateAds = (req, res, next) => {
  var query = "UPDATE ads_table SET ads_url = ? WHERE id_ads = ?;";
  var variableQuery = [req.body.url];

  if (req.file) {
    query =
      "UPDATE ads_table SET  ads_url = ?, image_url = ? WHERE id_ads = ?;";
    variableQuery.push(req.file.filename);
  }
  variableQuery.push(req.params.id);

  connection.query(query, variableQuery, (error, results, fields) => {
    somethingDatabaseReturn(error, results);
    next();
  });
};

exports.getAllAds = (req, res, next) => {
  connection.query("SELECT * FROM ads_table", (error, results, fields) => {
    somethingDatabaseReturn(error, results);
    console.log(results);
    // DEV
    // var sendData = results.map((e, i) => {
    //   e.image_url = "http://localhost:5021/img/ads/" + e.image_url;
    //   return e;
    // });
    //PRODUCTION
    var sendData = results.map((e, i) => {
      e.image_url = "http://208.87.132.73/img/ads/" + e.image_url;
      return e;
    });
    res.status(200).json({
      status: "success",
      data: sendData,
    });
  });
};

exports.deleteOneAds = (req, res, next) => {
  const id_ads = req.params.id;
  connection.query(
    "DELETE FROM ads_table WHERE id_ads = ?;",
    [parseInt(id_ads)],
    (error, results, fields) => {
      somethingDatabaseReturn(error, results);
      res.status(204).json({
        status: "success",
      });
    }
  );
};

// USER
exports.getOneAds = async (req, res, next) => {
  const id_ads = req.params.id;
  connection.query(
    "SELECT * FROM ads_table WHERE id_ads = ?;",
    [parseInt(id_ads)],
    (error, results, fields) => {
      somethingDatabaseReturn(error, results);
      // dev
      // results[0].image_url =
      //   "http://localhost:5021/img/ads/" + results[0].image_url;
      // prod
      results[0].image_url =
        "http://208.87.132.73/img/ads/" + results[0].image_url;
      res.status(200).json({
        status: "success",
        data: results,
      });
    }
  );
};

// ----------------------------------------------------------------------------------------------------------------------
exports.sendToClient = (req, res, next) => {
  connection.query(
    "SELECT * FROM ads_table WHERE id_ads = ?",
    [req.params.id],
    (error, results, fields) => {
      somethingDatabaseReturn(error, results);
      // dev
      // results[0].image_url =
      //   "http://localhost:5021/img/ads/" + results[0].image_url;
      // prod

      results[0].image_url =
        "http://208.87.132.73/img/ads/" + results[0].image_url;
      res.status(201).json({
        status: "success",
        data: results,
      });
    }
  );
};

exports.getImageDatabaseAndRemove = (req, res, next) => {
  connection.query(
    "SELECT * FROM ads_table WHERE id_ads = ?",
    [req.params.id],
    (error, results, fields) => {
      somethingDatabaseReturn(error, results);
      removeImageStorage(results[0].image_url, res, next);
    }
  );
};

const removeImageStorage = (pathFileImage, res, next) => {
  var pathFile = path.join(__dirname, `../public/img/ads/${pathFileImage}`);
  console.log(pathFile);
  try {
    fs.unlinkSync(pathFile);
    next();
  } catch (err) {
    return next(new AppError("Something wrong", 500));
  }
};
