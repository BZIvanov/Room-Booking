import { getSession } from 'next-auth/client';
import catchAsync from './catch-async';
import AppError from '../utils/app-error';

const isAuthenticated = catchAsync(async (req, res, next) => {
  const session = await getSession({ req });
  if (!session) {
    return next(new AppError('Login to access this resource', 401));
  }

  req.user = session.user;
  next();
});

const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new AppError(`User with role ${req.user.role} is not authorized`, 403)
      );
    }

    next();
  };
};

export { isAuthenticated, authorizeRoles };
