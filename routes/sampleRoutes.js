var express = require("express");
var router = express.Router();

router.route("/").get((req, res, next) => {
  // do something
  res.set("Content-Type", "text/html");
  res.status(200).send(Buffer.from("<h2>Hallo from Server</h2>"));
});

module.exports = router;
