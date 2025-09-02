import User from "../models/userModel.js";

import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// Rigister

export const registerUser = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;

    // chek if user already exist in DB

    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({
        message:
          "User already exists with this email try another emial or login",
      });
    // hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    res.status(201).json({
      message: "User registred successfully!",
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (error) {
    next(error);
  }
};

// Login

export const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // find user

    const user = await User.findOne({ email });

    if (!user)
      return res.status(400).json({
        message: "Invalid emial or password",
      });
    // check password!

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({
        message: "Invalid email or password",
      });

    // create JWT

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.json({
      message: "Login successfully!",
      token,
    });
  } catch (error) {
    next(error);
  }
};
