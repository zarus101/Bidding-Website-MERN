// In this line, defining a middleware for handling errors
const error__Handler = (err, req, res, next) => {
  // In this line, get the HTTP status code from the response or set it to 500 if not available
  const statusCode = res.statusCode ? res.statusCode : 500;

  // In this line, set the HTTP status code for the response
  res.status(statusCode);

  // In this line, send a JSON response with error details
  res.json({
    message: err.message,
    // In this line, include stack trace in the response only in the development environment
    stack: process.env.NODE_ENV === "development" ? err.stack : null,
  });
};

// In this line, export the error handler middleware
module.exports = error__Handler;
