import User from '../models/user';
import catchAsync from '../middlewares/catch-async';

const getAllUsers = catchAsync(async (req, res) => {
  const users = await User.find();

  res.status(200).json({
    success: true,
    users,
  });
});

export { getAllUsers };
