// Custom middleware to log requests
const requestLogger = (req, res, next) => {
  console.log(`${req.method} request for '${req.url}'`);
  next();
};

// 404 handler for undefined routes
const notFoundHandler = (req, res) => {
  res.status(404).json({
    success: false,
    message: `Route ${req.originalUrl} not found`,
  });
};

// Global error handler
const errorHandler = (error, req, res, next) => {
  res.status(500).json({
    success: false,
    message: "Internal server error",
    error:
      process.env.NODE_ENV === "development"
        ? error.message
        : "Something went wrong",
  });
};

module.exports = {
  requestLogger,
  notFoundHandler,
  errorHandler,
};
