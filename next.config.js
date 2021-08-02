module.exports = {
  reactStrictMode: true,
  images: {
    domains: ['res.cloudinary.com'],
  },
  env: {
    // mongo DB
    DB_LOCAL_URI: 'mongodb://localhost:27017/book-it',
    // cloudinary
    CLOUDINARY_CLOUD_NAME: 'mycloudname',
    CLOUDINARY_API_KEY: '868989295969658',
    CLOUDINARY_API_SECRET: 'dl4vVqvfoX9Dfwnaqn1ljmpriGo',
    // nodemailer
    NODEMAILER_SMTP_HOST: 'smtp.mailtrap.io',
    NODEMAILER_SMTP_PORT: 2525,
    NODEMAILER_SMTP_USER: '458121bc284539',
    NODEMAILER_SMTP_PASS: '4ae55288aba7c3',
    SMTP_FROM_NAME: 'Book it',
    SMTP_FROM_EMAIL: 'no-reply@bookit.com',
    // stripe
    SRIPE_API_KEY:
      'pk_test_51I2GG9CE4xwH3UTcMRFW2g4KUWhBnfLZDyNS8DeiDgVydz1OHJYZZEIAZhS9zAzdRW3gsmzgOYSgvANsWDMppoCH50jfbMJvxE',
    STRIPE_API_SECRET:
      'sk_test_52I2GG9CE2xwH3UTcOJ6sLPYUBa0EujrrMkThvC7svdp1FyRuCaoVRXFCClHYflJPMgtQ4pzBzhN4pfiC6M14rEo305hDCrml',
  },
};
