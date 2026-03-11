import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { getUserByEmail, getUserById, createuser } from "../repository/user.js";

export const registerUser = async (req, res) => {
  try {
    const { name, email, role, password } = req.body;
    const existingUser = await getUserByEmail(email);
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }
    // before saving we hash the password
    let SALT_ROUNDS = 12;
    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
    //by default the role is student
    const user = await createuser({ name, email, role, password: hashedPassword });
    return res.status(201).json({
      message: "User created successfully",
      data: user,
      success: true,
    });
  } catch (error) {
    res.status(500).json({ message: error.message, success: false });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await getUserByEmail(email);
    if (!user) {
      return res
        .status(404)
        .json({
          message: "User Email or Password is incorrect",
          success: false,
        });
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res
        .status(404)
        .json({
          message: "User Email or Password is incorrect",
          success: false,
        });
    }
    const accessToken = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_TOKEN_SECRET,
      { expiresIn: "20m" },
    );
    
    const refreshToken = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_REFRESH_SECRET,
      { expiresIn: "2d" },
    );
    const { password: _, ...safeUser } = user.toJSON();
    return res
      .status(200)
      .json({
        message: "User logged in successfully",
        data: { accessToken, refreshToken,  user: safeUser },
        success: true,
      });
  } catch (error) {
    res.status(500).json({ message: error.message, success: false });
  }
};

export const refreshToken = (req, res) => {
  const { refreshToken } = req.body;

  if (!refreshToken) {
    return res.status(401).json({
      success: false,
      message: "Refresh token required"
    });
  }

  try {
    const decoded = jwt.verify(
      refreshToken,
      process.env.JWT_REFRESH_SECRET
    );

    const newAccessToken = jwt.sign(
      { id: decoded.id },
      process.env.JWT_ACCESS_SECRET,
      { expiresIn: "15m" }
    );

    return res.json({
      success: true,
      accessToken: newAccessToken
    });

  } catch (error) {
    return res.status(403).json({
      success: false,
      message: "Invalid refresh token"
    });
  }
};
