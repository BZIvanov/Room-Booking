import crypto from 'crypto';
import { Schema, models, model } from 'mongoose';
import bcrypt from 'bcryptjs';
import validator from 'validator';
import { USER_ROLES } from '../constants';

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
      enum: USER_ROLES,
      default: USER_ROLES[0],
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date,
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

schema.methods.getResetPasswordToken = function () {
  const resetToken = crypto.randomBytes(20).toString('hex');

  this.resetPasswordToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');

  this.resetPasswordExpire = Date.now() + 30 * 60 * 1000;

  return resetToken;
};

export default models.User || model('User', schema);
