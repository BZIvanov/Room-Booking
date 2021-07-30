import User from '../models/user';
import catchAsync from '../middlewares/catch-async';
import AppError from '../utils/app-error';

const register = catchAsync(async (req, res) => {
  const { name, email, password } = req.body;

  const user = await User.create({
    name,
    email,
    password,
    avatar: {
      publicId: 'id',
      url: 'url',
    },
  });

  res.status(201).json({
    success: true,
    message: 'User registered',
  });
});

export { register };
