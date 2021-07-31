import cloudinary from 'cloudinary';
import User from '../models/user';
import catchAsync from '../middlewares/catch-async';

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

export { register };
