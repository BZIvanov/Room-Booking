const jwt = require('jsonwebtoken');
const User = require('../models/User');

module.exports = (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(401).end();
  }

  const token = req.headers.authorization.split(' ')[1];

  return jwt.verify(token, 's0m3 r4nd0m str1ng', (err, decoded) => {
    if (err) {
      return res.status(401).end();
    }

    const userId = decoded.sub;
    User.findById(userId).then((user) => {
      if (!user) {
        return res.status(401).end();
      }

      req.user = user;

      return next();
    });
  });
};
