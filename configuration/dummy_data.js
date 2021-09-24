var connection = require("./database");

// node configuration/dummy_data.js
connection.query(`CREATE DATABASE IF NOT EXISTS db_ads`, (error) => {
  if (error) throw error;
});
connection.query(
  `CREATE TABLE IF NOT EXISTS ads_table ( id_ads int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY, image_url varchar(200) NOT NULL, ads_url varchar(300) NOT NULL);`,
  (error) => {
    if (error) throw error;
  }
);

connection.query(
  "INSERT INTO ads_table (image_url, ads_url) VALUE (?, ?)",
  ["assets/imageName.jpg", "https://dummy-url.com"],
  function (error, results, fields) {
    if (error) throw error;
    console.log("The solution is: ", results);
  }
);
connection.query(
  "UPDATE ads_table SET image_url = ?, ads_url = ? WHERE id_ads = ?;",
  ["new path", "new_url", 4],
  function (error, results, fields) {
    if (error) throw error;
    console.log("The solution is: ", results);
  }
);

connection.query(
  "DELETE FROM ads_table WHERE id_ads = ?;",
  [4],
  function (error, results, fields) {
    if (error) throw error;
    console.log("The solution is: ", results);
  }
);

connection.query("SELECT * FROM ads_table", function (error, results, fields) {
  if (error) throw error;
  console.log("The solution is: ", results);
});
