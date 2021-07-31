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
    NODEMAILER_SMTP_HOST: 'smtp.mailtrap.io',
    NODEMAILER_SMTP_PORT: 2525,
    NODEMAILER_SMTP_USER: '458121bc284539',
    NODEMAILER_SMTP_PASS: '4ae55288aba7c3',
    SMTP_FROM_NAME: 'Book it',
    SMTP_FROM_EMAIL: 'no-reply@bookit.com',
  },
};
