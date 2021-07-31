module.exports = {
  reactStrictMode: true,
  images: {
    domains: ['res.cloudinary.com'],
  },
  env: {
    DB_LOCAL_URI: 'mongodb://localhost:27017/book-it',
    CLOUDINARY_CLOUD_NAME: 'mycloudname',
    CLOUDINARY_API_KEY: '868989295969658',
    CLOUDINARY_API_SECRET: 'dl4vVqvfoX9Dfwnaqn1ljmpriGo',
  },
};
