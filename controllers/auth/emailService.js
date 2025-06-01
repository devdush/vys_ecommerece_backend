const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: "mailservice.vys@gmail.com",
    pass: "wssrxzrogihsunwa", // Replace with the generated App Password
  },
});

const sendVerificationEmail = async (email, token) => {
  const verificationLink = `https://vys.lk/verify-email/${token}`;

  const mailOptions = {
    from: "mailservice.vys@gmail.com",
    to: email,
    subject: "Verify Your Email",
    html: `<p>Click the link below to verify your email:</p>
           <a href="${verificationLink}">${verificationLink}</a>`,
  };

  try {
    await transporter.sendMail(mailOptions);
    const timeStamp = new Date().toISOString();
    console.log("Verification email sent.", timeStamp);
  } catch (error) {
    console.error("Error sending email:", error);
  }
};

module.exports = { sendVerificationEmail };
