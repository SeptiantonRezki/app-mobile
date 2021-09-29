const mysql = require("mysql");

var connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "8%tmnN!t7",
  // password: "",
  database: "db_ads",
});

module.exports = connection;
