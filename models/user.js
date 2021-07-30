import { Schema, models, model } from 'mongoose';
import bcrypt from 'bcryptjs';
import validator from 'validator';

const schema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide a name'],
      maxLength: [50, 'User name should be at most 50 characters'],
    },
    email: {
      type: String,
      required: [true, 'Please provide an email'],
      unique: true,
      validate: [validator.isEmail, 'Please provide a valid email'],
    },
    password: {
      type: String,
      required: [true, 'Please provide a password'],
      minLength: [6, 'Password must be at least 6 characters'],
      select: false,
    },
    avatar: {
      publicId: { type: String, required: true },
      url: { type: String, required: true },
    },
    role: {
      type: String,
      enum: ['user', 'admin'],
      default: 'user',
    },
    resetPasswordToken: String,
    resetPasswordExpire: String,
  },
  { timestamps: true }
);

schema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next();
  }

  this.password = await bcrypt.hash(this.password, 8);
});

schema.methods.comparePassword = async function (incomingPassword) {
  return await bcrypt.compare(incomingPassword, this.password);
};

export default models.User || model('User', schema);
