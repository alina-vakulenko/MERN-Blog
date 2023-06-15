import { Request, Response } from "express";
import { UserService } from "../services";
import { IUserCreate, IUser, IUserUpdate, IUserOutput } from "../types/user";
import { IJwtPayload } from "./../types/jwt";

export const create = async (req: Request, res: Response) => {
  const registerInput: IUserCreate = req.body;

  if (!registerInput.email || !registerInput.password || !registerInput.name)
    return res.status(400).json({
      message: "Email, username and password are required",
    });

  try {
    await UserService.createUser(registerInput);
    res.status(201).json({ success: true });
  } catch (err: any) {
    console.log(err);
    if (err.code === 11000) {
      return res.status(409).json({
        message: `User with email ${registerInput.email} already exists`,
      });
    }
    res.status(500).json({ message: "Registration failed" });
  }
};

export const getAll = async (req: Request, res: Response) => {
  try {
    const users: IUser[] = await UserService.getAllUsers();
    if (!users) return res.status(204).json({ message: "No users found" });
    const usersOutput = users.map((user) => {
      const { roles, password, ...userData } = user;
      const userRoles = Object.values(roles).filter(Boolean);
      return { ...userData, roles: userRoles };
    });
    res.json({ count: users.length, users: usersOutput });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to load users" });
  }
};

export const getOne = async (req: Request, res: Response) => {
  if (!req.params.id)
    return res.status(400).json({ message: "User id is required" });
  try {
    const userId = req.params.id;
    const user = await UserService.findUserById(userId);

    if (!user) {
      return res.status(404).json({
        message: "User was not found",
      });
    }
    const { password, roles, ...userData } = user;
    const userOutput: IUserOutput = {
      ...userData,
      roles: Object.values(roles).filter(Boolean),
    };
    res.json(userOutput);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Failed to get the user",
    });
  }
};

export const remove = async (req: Request, res: Response) => {
  if (!req.params.id)
    return res.status(400).json({ message: "User id is required" });
  try {
    const userId = req.params.id;
    const user = await UserService.findUserById(userId);

    if (!user) {
      return res.status(404).json({
        message: "User was not found",
      });
    }

    const deleteResult = await UserService.deleteUserByField({
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

export const update = async (req: Request, res: Response) => {
  if (!req.params.id)
    return res.status(400).json({ message: "User id is required" });

  const { name, avatarUrl }: IUserUpdate = req.body;
  try {
    const userId = req.params.id;
    const user = await UserService.findUserById(userId);

    if (!user) {
      return res.status(404).json({
        message: "User was not found",
      });
    }

    const updateResult = await UserService.updateUserByField(
      {
        _id: userId,
      },
      {
        name,
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

export const getMe = async (req: Request, res: Response) => {
  try {
    const userPayload: IJwtPayload = res.locals.user;
    const user = await UserService.findUserById(String(userPayload.userId));
    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }
    const { password, roles, ...userData } = user;
    const userOutput: IUserOutput = {
      ...userData,
      roles: Object.values(roles).filter(Boolean),
    };
    res.json(userOutput);
  } catch (err) {
    res.status(500).json({ message: "Failed to get logged-in user" });
  }
};
