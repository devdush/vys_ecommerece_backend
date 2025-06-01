const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: "info@vys.lk",
    pass: "tdupdrjguwwjtbxw", // Replace with the generated App Password
  },
});

const sendVerificationEmail = async (email, token) => {
  const verificationLink = `https://vys.lk/verify-email/${token}`;

  const mailOptions = {
    from: "dhdsfake.1997@gmail.com",
    to: email,
    subject: "Verify Your Email",
    html: `<p>Click the link below to verify your email:</p>
           <a href="${verificationLink}">${verificationLink}</a>`,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Verification email sent.");
  } catch (error) {
    console.error("Error sending email:", error);
  }
};

module.exports = { sendVerificationEmail };
