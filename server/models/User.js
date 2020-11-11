const mongoose = require('mongoose');
const encryption = require('../utilities/encryption');

const REQUIRED_VALIDATION_MESSAGE = '{PATH} is required';

const userSchema = new mongoose.Schema({
  email: { type: String, required: REQUIRED_VALIDATION_MESSAGE, unique: true },
  username: { type: String, required: REQUIRED_VALIDATION_MESSAGE },
  salt: String,
  password: String,
  roles: [String],
});

userSchema.method({
  authenticate: function (password) {
    return (
      encryption.generateHashedPassword(this.salt, password) === this.password
    );
  },
});

module.exports = mongoose.model('User', userSchema);

module.exports.seedAdminUser = () => {
  User.find({}).then((users) => {
    if (users.length > 0) return;

    let salt = encryption.generateSalt();
    let password = encryption.generateHashedPassword(salt, '12345678');

    User.create({
      email: 'admin@admin.com',
      username: 'Admin',
      salt: salt,
      password: password,
      roles: ['Admin'],
    });
  });
};
