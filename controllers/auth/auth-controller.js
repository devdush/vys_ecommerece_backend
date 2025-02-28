const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const User = require("../../models/User");
const { sendVerificationEmail } = require("./emailService");
const { log } = require("console");

const registerUser = async (req, res) => {
  const {
    firstName,
    lastName,
    email,
    primaryPhoneNumber,
    secondaryPhoneNumber,
    password,
  } = req.body;

  try {
    const checkUser = await User.findOne({ email });
    if (checkUser) {
      return res.json({
        success: false,
        message: "User already exists with the same email address",
      });
    }

    const hashPassword = await bcrypt.hash(password, 12);
    const verificationToken = crypto.randomBytes(32).toString("hex"); // Generate token

    const newUser = new User({
      firstName,
      lastName,
      email,
      primaryPhoneNumber,
      secondaryPhoneNumber,
      password: hashPassword,
      verificationToken,
    });

    await newUser.save();

    // Send email verification link
    await sendVerificationEmail(email, verificationToken);

    res.status(200).json({
      success: true,
      message:
        "Registration successful. Please check your email for verification.",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Some error occurred.",
    });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const checkUser = await User.findOne({ email });
    if (!checkUser) {
      return res.json({
        success: false,
        message: "User doesn't exist! Please register first.",
      });
    }

    if (!checkUser.verified) {
      return res.json({
        success: false,
        message: "Please verify your email before logging in.",
      });
    }

    const checkPasswordMatch = await bcrypt.compare(
      password,
      checkUser.password
    );
    if (!checkPasswordMatch) {
      return res.json({
        success: false,
        message: "Incorrect username or password! Please try again.",
      });
    }

    const token = jwt.sign(
      {
        id: checkUser.id,
        role: checkUser.role,
        email: checkUser.email,
        firstName: checkUser.firstName,
      },
      "CLIENT_SECRET_KEY",
      { expiresIn: "500m" }
    );

    res.json({
      success: true,
      message: "Logged in successfully",
      token,
      user: {
        email: checkUser.email,
        firstName: checkUser.firstName,
        lastName: checkUser.lastName,
        primaryPhoneNumber: checkUser.primaryPhoneNumber,
        secondaryPhoneNumber: checkUser.secondaryPhoneNumber,
        role: checkUser.role,
        id: checkUser._id,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Some error occurred.",
    });
  }
};

const logoutUser = (req, res) => {
  res.clearCookie("token").json({
    success: true,
    message: "Logged out successfully!",
  });
};

const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token)
    return res.json({
      success: false,
      message: "Unauthorized user!",
    });
  try {
    const decoded = jwt.verify(token, "CLIENT_SECRET_KEY");
    req.user = decoded;
    next();
  } catch (error) {
    res.json({
      success: false,
      message: "Unauthorized user!",
    });
  }
};
const verifyEmail = async (req, res) => {
  console.log("verifyEmail");
  const { token } = req.query;
  console.log(token);
  try {
    const user = await User.findOne({ verificationToken: token });

    if (!user) {
      return res.json({
        success: false,
        message: "Invalid or expired verification token.",
      });
    }

    user.verified = true;
    user.verificationToken = null; // Clear token after verification
    await user.save();

    res.json({
      success: true,
      message: "Email verified successfully. You can now log in.",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Some error occurred.",
    });
  }
};

module.exports = {
  registerUser,
  loginUser,
  logoutUser,
  authMiddleware,
  verifyEmail,
};
