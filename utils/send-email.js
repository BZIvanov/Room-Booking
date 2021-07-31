import nodemailer from 'nodemailer';

const sendEmail = async (options) => {
  const transport = nodemailer.createTransport({
    host: process.env.NODEMAILER_SMTP_HOST,
    port: process.env.NODEMAILER_SMTP_PORT,
    auth: {
      user: process.env.NODEMAILER_SMTP_USER,
      pass: process.env.NODEMAILER_SMTP_PASS,
    },
  });

  const message = {
    from: `${process.env.SMTP_FROM_NAME} <${process.env.SMTP_FROM_EMAIL}>`,
    to: options.email,
    subject: options.subject,
    text: options.text,
  };

  await transport.sendMail(message);
};

export default sendEmail;
