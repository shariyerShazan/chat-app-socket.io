import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const register = async (req, res) => {
  try {
    const { fullName, email, password } = req.body;

    if (!fullName || !email || !password) {
      return res.status(400).json({
        message: "Something is missing.",
        success: false,
      });
    }

    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({
        message: "User already exists with this email",
        success: false,
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        message: "Password must be at least 6 characters",
        success: false,
      });
    }
    if (!/[a-zA-Z]/.test(password)) {
      return res.status(400).json({
        message: "Password must contain at least one letter",
        success: false,
      });
    }
    if (!/[0-9]/.test(password)) {
      return res.status(400).json({
        message: "Password must contain at least one number",
        success: false,
      });
    }

    const hashPassword = await bcrypt.hash(password, 10);

    await User.create({
      fullName,
      email,
      password: hashPassword,
    });

    return res.status(201).json({
      message: "User registered successfully",
      success: true,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Something is missing.",
        success: false,
      });
    }

    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return res.status(404).json({
        message: "User not found with this email",
        success: false,
      });
    }

    const correctPass = await bcrypt.compare(password, user.password);
    if (!correctPass) {
      return res.status(400).json({
        message: "Password is incorrect",
        success: false,
      });
    }

    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "3d" }
    );

    const { password: pass, ...safeUser } = user.toObject(); 

    return res
      .status(200)
      .cookie("token", token, {
        httpOnly: true,
        secure: true, 
        sameSite: "strict",
        maxAge: 3 * 24 * 60 * 60 * 1000, 
      })
      .json({
        message: `Welcome back ${user.fullName}`,
        success: true,
        user: safeUser,
      });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};

export const logout = async (_, res) => {
  try {
    return res
      .status(200)
      .cookie("token", "", {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
        expires: new Date(0),
      })
      .json({
        message: "Logged out successfully",
        success: true,
      });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};
