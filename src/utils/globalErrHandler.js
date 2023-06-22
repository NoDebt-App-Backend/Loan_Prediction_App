
export function globalErrorHandler(err, req, res, next) {
  console.error(err);//to log error to the console
  console.error(err.stack); // to log error stack to console
  
  if (err.name === "ValidationError") {
    return res.status(400).json({
      message: err.message || "Validation error",
      status: "Failed",
      errorType: "ValidationError",
    });
  }

  const statusCode = err.status || 500;
  const errorMessage = err.message || "Internal server error";

  return res.status(statusCode).json({
    message: errorMessage,
    status: "Failed",
  });
}
