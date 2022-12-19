const express = require("express");
const routes = require("./src/routes");

const app = express();

// To parse JSON included in request
app.use(express.json());

// Prepends /api to our routes
app.use("/api", routes);

// Global error handler
app.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || "Unspecified error";

  return res.status(status).json({
    error: { message, status },
  });
});

module.exports = app;
