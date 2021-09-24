const path = require('path');
const express = require("express");
const app = express();
const cors = require('cors');
const cookieParser = require('cookie-parser');


const appRoutes = require("./routes/appRoutes");
const AppError = require("./utils/appError");
const globalErrorHandler = require("./controllers/errorController");


app.use(cors());

// Serving static files
app.use(express.static(path.join(__dirname, 'public')));
// GET FILE => http://localhost:5021/img/ads/ads-1632389819493.jpeg

// MIDDLEWARE
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));
app.use(cookieParser());

// ROUTE
app.use("/api/v1/app", appRoutes);

// HANDLE ERROR
app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
