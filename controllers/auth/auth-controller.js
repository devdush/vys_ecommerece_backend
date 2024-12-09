const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../../models/User");
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
        message: "User already exists with same email address",
      });
    }
    const hashPassword = await bcrypt.hash(password, 12);
    const newUser = new User({
      firstName,
      lastName,
      email,
      primaryPhoneNumber,
      secondaryPhoneNumber,
      password: hashPassword,
    });
    await newUser.save();
    res.status(200).json({
      success: true,
      message: "Registration Successful",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Some Error",
    });
  }
};
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  
  try {
    const checkUser = await User.findOne({ email });
    if (!checkUser)
      return res.json({
        success: false,
        message: "User doesn't exists! Please register first",
      });
    const checkPasswordMatch = await bcrypt.compare(
      password,
      checkUser.password
    );
    if (!checkPasswordMatch)
      return res.json({
        success: false,
        message: "Incorrect username or password! Please try again",
      });

    const token = jwt.sign(
      {
        id: checkUser.id,
        role: checkUser.role,
        email: checkUser.email,
      },
      "CLIENT_SECRET_KEY",
      { expiresIn: "500m" }
    );
    // res.cookie("token", token, { httpOnly: true, secure: true }).json({
    //   success: true,
    //   message: "Logged in successfully",
    //   user: {
    //     email: checkUser.email,
    //     firstName: checkUser.firstName,
    //     lastName: checkUser.lastName,
    //     primaryPhoneNumber: checkUser.primaryPhoneNumber,
    //     secondaryPhoneNumber: checkUser.secondaryPhoneNumber,
    //     role: checkUser.role,
    //     id: checkUser._id,
    //   },
    // });
    console.log(token);
    
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
      message: "Some Error",
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
module.exports = { registerUser, loginUser, logoutUser, authMiddleware };
