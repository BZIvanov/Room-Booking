import AppError from '../utils/app-error';

export default (err, req, res, next) => {
  let error = { ...err };
  error.message = err.message;

  if (err.name === 'CastError') {
    const message = `Invalid ${error.path}`;
    error = new AppError(message, 400);
  }

  if (err.name === 'ValidationError') {
    const message = Object.values(err.errors).map((value) => value.message);
    error = new AppError(message, 400);
  }

  res.status(err.statusCode || 500).json({
    success: false,
    message: error.message,
    stack: error.stack,
    error: error,
  });
};
