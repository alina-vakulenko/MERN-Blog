import bcrypt from "bcrypt";

import UserModel from "../models/User.js";

export const create = async (req, res) => {
  const { email, name, password, avatarUrl } = req.body;
  try {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    await UserModel.create({
      email,
      name,
      avatarUrl,
      passwordHash: hash,
    });

    res.status(201).json({ success: true });
  } catch (err) {
    res.status(500).json({ message: `Registration failed. ${err.message}` });
  }
};

export const getAll = async (req, res) => {
  try {
    const users = await UserModel.find().exec();
    if (!users) return res.status(204).json({ message: "No users found" });
    const usersToDisplay = users.map((user) => ({
      ...user._doc,
      roles: Object.values(user.roles).filter(Boolean),
    }));
    res.json({ count: usersToDisplay.length, users: usersToDisplay });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to load users" });
  }
};

export const getOne = async (req, res) => {
  if (!req.params.id)
    return res.status(400).json({ message: "User id is required" });
  try {
    const userId = req.params.id;
    const user = await UserModel.findById(userId).exec();

    if (!user) {
      return res.status(404).json({
        message: "User was not found",
      });
    }

    res.json(user);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Failed to get the user",
    });
  }
};

export const remove = async (req, res) => {
  if (!req.params.id)
    return res.status(400).json({ message: "User id is required" });
  try {
    const userId = req.params.id;
    const user = await UserModel.findById(userId).exec();

    if (!user) {
      return res.status(404).json({
        message: "User was not found",
      });
    }

    const deleteResult = await UserModel.deleteOne({
      _id: userId,
    });

    if (deleteResult.acknowledged) {
      return res.json({
        success: true,
      });
    }

    res.status(500).json({
      message: "Failed to remove the user",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Failed to remove the user",
    });
  }
};

export const update = async (req, res) => {
  if (!req.params.id)
    return res.status(400).json({ message: "User id is required" });
  const { name, avatarUrl, roles } = req.body;
  try {
    const userId = req.params.id;
    const user = await UserModel.findById(userId).exec();

    if (!user) {
      return res.status(404).json({
        message: "User was not found",
      });
    }

    const updateResult = await UserModel.updateOne(
      {
        _id: userId,
      },
      {
        name,
        roles,
        avatarUrl,
      }
    );

    if (updateResult.acknowledged) {
      return res.json({
        success: true,
      });
    }

    res.status(500).json({
      message: "Failed to edit the user",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Failed to edit the post",
    });
  }
};
