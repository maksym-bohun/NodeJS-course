const nodemailer = require('nodemailer');

module.exports = async ({ email, subject, message }) => {
  // 1) Create transporter
  const transporter = nodemailer.createTransport({
    service: 'hotmail',
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  // 2) Define the email options
  const mailOptions = {
    from: 'maks.bohun@outlook.com',
    to: email,
    subject: subject,
    text: message,
  };

  // 3) Send email
  await transporter.sendMail(mailOptions);
};
