const express = require("express");
const app = express();

const sampleRoutes = require("./routes/sampleRoutes");


// MIDDLEWARE
app.use(express.json({ limit: "10kb" }));

// ROUTE
app.use("/api/v1/sample", sampleRoutes);

// HANDLE ERROR
app.use("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server !`, 404));
});
// app.use(globalErrorHandler);

module.exports = app;