process.on("uncaughtException", (err) => {
  console.log(err.name, err.message, err);
  console.log("UNCAUGHT EXCEPTION * Shutting down.....");
  process.exit(1);
});

const app = require("./app");

const server = app.listen(5021, () => {
  console.log("server anda telah berjalan");
});

//ERROR
process.on("unhandledRejection", (err) => {
  console.log(err.name, err.message);
  console.log("UNHANDLED REJECTION * Shutting down.....");
  server.close(() => {
    process.exit(1);
  });
});
process.on("SIGTERM", () => {
  console.log("👋 SIGTERM RECEIVED. Shutting down gracefully");
  server.close(() => {
    console.log("💥 Process terminated!");
  });
});
