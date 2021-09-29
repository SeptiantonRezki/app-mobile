const path = require("path");
const fs = require("fs");
const util = require("util");
const AppError = require("./../utils/appError");
const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);

exports.getScript = async (req, res, next) => {
  try {
    const dataFileOne = await readFile(
      __dirname + "/../public/script/js/script-one.txt",
      "utf8"
    );
    const dataFileTwo = await readFile(
      __dirname + "/../public/script/js/script-two.txt",
      "utf8"
    );
    const dataFileThree = await readFile(
      __dirname + "/../public/script/js/script-three.txt",
      "utf8"
    );
    res.status(200).json({
      status: "success",
      data: [dataFileOne, dataFileTwo, dataFileThree],
    });
  } catch {
    return next(new AppError("Something Wrong Server", 500));
  }
};

exports.addScript = (req, res, next) => {
  // CREATE NEW FILE
};

exports.updateScript = async (req, res, next) => {
  var scriptOne = req.body.script_one;
  var scriptTwo = req.body.script_two;
  var scriptThree = req.body.script_three;
  console.log(req.body.script_one);
  console.log(req.body.script_two);
  console.log(req.body.script_three);
  try {
    if (req.body.script_one !== undefined) {
      await writeFile(
        __dirname + "/../public/script/js/script-one.txt",
        `${scriptOne}`
      );
    }
    if (req.body.script_two !== undefined) {
      await writeFile(
        __dirname + "/../public/script/js/script-two.txt",
        `${scriptTwo}`
      );
    }
    if (scriptThree !== undefined) {
      await writeFile(
        __dirname + "/../public/script/js/script-three.txt",
        `${scriptThree}`
      );
    }
    const dataFileOne = await readFile(
      __dirname + "/../public/script/js/script-one.txt",
      "utf8"
    );
    const dataFileTwo = await readFile(
      __dirname + "/../public/script/js/script-two.txt",
      "utf8"
    );
    const dataFileThree = await readFile(
      __dirname + "/../public/script/js/script-three.txt",
      "utf8"
    );
    res.status(201).json({
      status: "success",
      data: [dataFileOne, dataFileTwo, dataFileThree],
    });
  } catch (error) {
    return next(new AppError("Something Wrong Server", 500));
  }
};
