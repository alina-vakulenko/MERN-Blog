import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

import UserModel from "../models/User.js";

export const register = async (req, res) => {
  const { email, name, password, avatarUrl } = req.body;
  if (!email || !password || !name)
    return res.status(400).json({
      message: "Email, username and password are required",
    });

  try {
    const duplicate = await UserModel.findOne({ email: email }).exec();
    if (duplicate)
      return res
        .status(409)
        .json({ message: `User with email ${email} already exists` });

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    const newUser = await UserModel.create({
      email,
      name,
      avatarUrl,
      passwordHash: hash,
    });

    res.status(201).json({ success: true });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Registration failed" });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res.status(400).json({
      message: "Email and password are required.",
    });

  try {
    const user = await UserModel.findOne({ email: email }).exec();
    if (!user) {
      return res.sendStatus(401);
    }

    const isPasswordValid = await bcrypt.compare(
      password,
      user._doc.passwordHash
    );

    if (!isPasswordValid) {
      return res.sendStatus(401);
    }

    const userRoles = Object.values(user.roles);
    const accessToken = jwt.sign(
      {
        UserData: {
          _id: user._id,
          roles: userRoles,
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: process.env.ACCESS_TOKEN_EXPIRE }
    );

    const refreshToken = jwt.sign(
      {
        _id: user._id,
      },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: process.env.REFRESH_TOKEN_EXPIRE }
    );

    res.cookie("jwt", refreshToken, {
      httpOnly: true,
      // secure: process.env.NODE_ENV !== "development",
      sameSite: "None",
      maxAge: 24 * 60 * 60 * 1000,
    });

    const { passwordHash, roles, ...userData } = user._doc;
    res.json({ ...userData, userRoles, accessToken });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Login failed" });
  }
};

export const getMe = async (req, res) => {
  try {
    const user = await UserModel.findOne({ userId: req.userId }).exec();
    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }
    const { passwordHash, roles, ...userData } = user._doc;
    res.json({ ...userData, roles: Object.values(roles) });
  } catch (err) {
    res.status(500).json({ message: "Failed to get logged-in user" });
  }
};

export const refresh = async (req, res) => {
  const cookies = req.cookies;
  console.log(cookies);
  if (!cookies?.jwt) {
    console.log("no cookies");
    return res.sendStatus(401);
  }

  const refreshToken = cookies.jwt;
  try {
    const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
    console.log(decoded);
    const user = await UserModel.findById(decoded._id).exec();

    if (!user) {
      return res.sendStatus(403);
    }
    const roles = Object.values(user.roles);
    const accessToken = jwt.sign(
      {
        UserData: {
          _id: user._id,
          roles: roles,
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: process.env.ACCESS_TOKEN_EXPIRE }
    );

    res.json({ accessToken, roles });
  } catch (err) {
    console.log(err);
    res.sendStatus(403);
  }
};

export const logout = async (req, res) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) return res.sendStatus(204);
  res.clearCookie("jwt", {
    httpOnly: true,
    sameSite: "None",
    // secure: process.env.NODE_ENV !== "development",
  });
  res.sendStatus(204);
};
