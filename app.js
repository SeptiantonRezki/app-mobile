const path = require("path");
const express = require("express");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");
var bodyParser = require("body-parser");

const appRoutes = require("./routes/appRoutes");
const scriptRoutes = require("./routes/scriptRoutes");
const AppError = require("./utils/appError");
const globalErrorHandler = require("./controllers/errorController");

app.use(cors());

// Serving static files
app.use(express.static(path.join(__dirname, "public")));
// GET FILE => http://localhost:5021/img/ads/ads-1632389819493.jpeg

// MIDDLEWARE
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json({ limit: "10kb" }));

// ROUTE
app.use("/api/v1/app", appRoutes);
app.use("/api/v1/script", scriptRoutes);

// HANDLE ERROR
app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
