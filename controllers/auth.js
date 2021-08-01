import crypto from 'crypto';
import absoluteUrl from 'next-absolute-url';
import cloudinary from 'cloudinary';
import User from '../models/user';
import catchAsync from '../middlewares/catch-async';
import AppError from '../utils/app-error';
import sendEmail from '../utils/send-email';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const register = catchAsync(async (req, res) => {
  const avatar = await cloudinary.v2.uploader.upload(req.body.avatar, {
    folder: 'bookit/avatars',
    width: '150',
    crop: 'scale',
  });

  const { name, email, password } = req.body;

  await User.create({
    name,
    email,
    password,
    avatar: {
      publicId: avatar.public_id,
      url: avatar.secure_url,
    },
  });

  res.status(201).json({
    success: true,
    message: 'User registered',
  });
});

const getMe = catchAsync(async (req, res) => {
  const user = await User.findById(req.user._id);

  res.status(200).json({
    success: true,
    user,
  });
});

const updateProfile = catchAsync(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    user.name = req.body.name;
    user.email = req.body.email;
  }

  if (req.body.password) {
    user.password = req.body.password;
  }

  if (req.body.avatar !== '') {
    const imageId = user.avatar.publicId;

    await cloudinary.v2.uploader.destroy(imageId);

    const avatar = await cloudinary.v2.uploader.upload(req.body.avatar, {
      folder: 'bookit/avatars',
      width: '150',
      crop: 'scale',
    });

    user.avatar = {
      publicId: avatar.public_id,
      url: avatar.secure_url,
    };
  }

  await user.save();

  res.status(200).json({
    success: true,
  });
});

const forgotPassword = catchAsync(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return next(new AppError('User not found', 404));
  }

  const resetToken = user.getResetPasswordToken();

  await user.save({ validateBeforeSave: false });

  const { origin } = absoluteUrl(req);
  const resetUrl = `${origin}/password/reset/${resetToken}`;

  const text = `Open the url to reset your password\n${resetUrl}`;

  try {
    await sendEmail({
      email: user.email,
      subject: 'Password Reset',
      text,
    });

    res.status(200).json({
      success: true,
      message: `Email sent to ${user.email}`,
    });
  } catch (error) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save({ validateBeforeSave: false });

    return next(new AppError(error.message, 500));
  }
});

const resetPassword = catchAsync(async (req, res, next) => {
  const resetPasswordToken = crypto
    .createHash('sha256')
    .update(req.query.token)
    .digest('hex');

  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() },
  });
  if (!user) {
    return next(new AppError('Invalid or expired token', 400));
  }

  if (req.body.password !== req.body.confirmPassword) {
    return next(new AppError('Passwords must match', 400));
  }

  user.password = req.body.password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;

  await user.save();

  res.status(200).json({
    success: true,
    message: `Password updated`,
  });
});

export { register, getMe, updateProfile, forgotPassword, resetPassword };
