const path = require('path');

const rootPath = path.normalize(path.join(__dirname, '/../'));

module.exports = {
  development: {
    rootPath,
    db: 'mongodb://localhost:27017/WildCard',
    port: 5000,
  },
  staging: {},
  production: {
    port: process.env.PORT,
  },
};
