import validator from "validator";
import bcrypt from "bcryptjs";
// import crypto from "crypto";

// import { ENV } from "../config/env.js";
import { generateToken } from "../config/generateToken.js";
import User from "../models/user.model.js";
import Onboarding from "../models/onboarding.model.js";

// import {
//   sendWelcomeEmail,
//   sendResetEmail,
// } from "../services/emails/emailHandler.js";

export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // validate inputs
    if (!email || !password) {
      return res.status(400).json({ message: "All fields must be filled" });
    }

    // check if email exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Incorrect email or password" });
    }

    // match password
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(400).json({ message: "Incorrect email or password" });
    }

    // generate token
    const token = generateToken(res, user._id);

    // return the user
    res.status(200).json({
      message: "User logged in successfully",
      user,
      token,
    });
  } catch (error) {
    console.log("Error in loginUser", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const signupUser = async (req, res) => {
  const { fullName, email, password, role } = req.body;

  try {
    // Validations
    if (!fullName || !email || !password) {
      return res.status(400).json({ message: "All fields must be filled" });
    }
    if (!validator.isEmail(email)) {
      return res.status(400).json({ message: "Invalid email format" });
    }
    if (!validator.isStrongPassword(password)) {
      return res.status(400).json({ message: "Password is not strong enough" });
    }

    // check if email exists
    const exists = await User.findOne({ email });
    if (exists) {
      return res.status(400).json({ message: "Email already exists" });
    }

    // generate salt and hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    let avatarUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(fullName)}&background=random`;

    // create a new user
    const user = new User({
      fullName,
      profilePic: {
        public_id: "",
        secure_url: avatarUrl,
      },
      email,
      role,
      password: hashedPassword,
    });

    // save user to the DB
    await user.save();

    // generate token
    const token = generateToken(res, user._id);

    // try {
    //   await sendWelcomeEmail(email, name, ENV.FRONTEND_URL);
    // } catch (error) {
    //   console.log(error);
    // }

    res.status(201).json({
      message: "Account registered successfully",
      user,
      token,
    });
  } catch (error) {
    console.log("Error in signupUser", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const logoutUser = async (req, res) => {
  try {
    res.cookie("token", "", { maxAge: 0 });

    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    console.log("Error in loginUser", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const checkAuth = async (req, res) => {
  try {
    res.status(200).json({
      message: "user is logged in",
      user: req.user,
    });
  } catch (error) {
    console.log("Error in loginUser", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const myBusinessProfile = async (req, res) => {
  try {
    const userId = req.user._id;

    const business = await Onboarding.findOne({ user: userId }).populate(
      "user",
    );

    if (!business)
      return res.status(404).json({ message: "Business account not found" });

    res.status(200).json(business);
  } catch (error) {
    console.log("Error in loginUser", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// export const requestPasswordReset = async (req, res) => {
//   const { email } = req.body;

//   try {
//     const user = await User.findOne({ email });
//     if (!user) return res.status(404).json({ message: "User not found" });

//     // generate token
//     const resetToken = crypto.randomBytes(32).toString("hex");
//     user.resetPasswordToken = resetToken;
//     user.resetPasswordExpires = Date.now() + 15 * 60 * 1000;
//     await user.save();

//     // build link (web + deep link)
//     const resetUrlWeb = `${ENV.FRONTEND_URL}/reset-password?token=${resetToken}`;
//     // const resetUrlApp = `studentstostudent://reset-password?token=${resetToken}`;

//     await sendResetEmail(user.email, resetUrlWeb, resetUrlWeb); // TODO: replace resetUrlWeb with resetUrlApp on last param

//     res.json({
//       message: "Password reset link sent",
//       // app_reset_url: resetUrlApp,
//       // web_reset_url: resetUrlWeb,
//     });
//   } catch (error) {
//     console.error("Error in requestPasswordReset", error);
//     res.status(500).json({ message: "Internal server error" });
//   }
// };

// export const resetPassword = async (req, res) => {
//   const { token, newPassword } = req.body;

//   try {
//     if (!validator.isStrongPassword(newPassword)) {
//       return res.status(400).json({ message: "Password not strong enough" });
//     }

//     const user = await User.findOne({
//       resetPasswordToken: token,
//       resetPasswordExpires: { $gt: Date.now() },
//     });
//     if (!user)
//       return res.status(400).json({ message: "Invalid or expired token" });

//     // hash new password
//     const salt = await bcrypt.genSalt(10);
//     user.password = await bcrypt.hash(newPassword, salt);

//     // clear reset fields
//     user.resetPasswordToken = undefined;
//     user.resetPasswordExpires = undefined;
//     await user.save();

//     res.json({ message: "Password updated successfully" });
//   } catch (error) {
//     console.error("Error in resetPassword", error);
//     res.status(500).json({ message: "Internal server error" });
//   }
// };
