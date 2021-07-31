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

export { isAuthenticated };
