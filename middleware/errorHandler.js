const errorHandler = (err, req, res, next) => {
  console.error(err.stack);

  const statusCode = res.statusCode ? res.statusCode : 500;
  let message = err.message;

  // Mongoose validation error
  if (err.name === 'ValidationError') {
    res.status(400);
    message = Object.values(err.errors)
      .map((val) => val.message)
      .join(', ');
  }

  // Mongoose duplicate key error (custom message from model)
  if (err.message.includes('already exists')) {
    res.status(409);
  }

  res.status(statusCode).json({
    success: false,
    error: message || 'Server Error',
  });
};

module.exports = errorHandler;
