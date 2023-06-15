import { Request, Response } from "express";
import { UserService } from "../services";
import { comparePasswords } from "../utils/passwordHash";
import {
  generateAccessToken,
  generateRefreshToken,
  decodeRefreshToken,
} from "../utils/jwt";
import cookieOptions from "../config/cookieOptions";
import { IUserLogin, Roles } from "../types/user";
import { IJwtPayload, Token } from "../types/jwt";

export const login = async (req: Request, res: Response) => {
  const loginInput: IUserLogin = req.body;

  if (!loginInput.email || !loginInput.password)
    return res.status(400).json({
      message: "Email and password are required.",
    });

  try {
    const user = await UserService.findUserByField({
      email: loginInput.email,
    });

    if (!user) {
      return res.sendStatus(401);
    }
    const { password, roles, ...userData } = user;

    const isPasswordValid: boolean = await comparePasswords(
      loginInput.password,
      password
    );
    if (!isPasswordValid) {
      return res.sendStatus(401);
    }

    const userRoles: Roles = Object.values(roles).filter(Boolean);
    const tokenPayload: IJwtPayload = { userId: user._id, roles: userRoles };
    const refreshToken: Token = generateRefreshToken(tokenPayload);
    const accessToken: Token = generateAccessToken(tokenPayload);
    const userOutput = { ...userData, accessToken, roles: userRoles };

    res.cookie("jwt", refreshToken, cookieOptions);
    res.json(userOutput);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Login failed" });
  }
};

export const refresh = async (req: Request, res: Response) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) {
    console.log("no cookies");
    return res.sendStatus(401);
  }

  try {
    const decodedUser = decodeRefreshToken(cookies.jwt);
    const user = await UserService.findUserById(String(decodedUser.userId));
    if (!user) {
      return res.sendStatus(403);
    }

    const tokenPayload: IJwtPayload = {
      userId: user._id,
      roles: decodedUser.roles,
    };

    const newAccessToken: Token = generateAccessToken(tokenPayload);
    res.json({ accessToken: newAccessToken, roles: decodedUser.roles });
  } catch (err) {
    console.log(err);
    res.sendStatus(403);
  }
};

export const logout = async (req: Request, res: Response) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) return res.sendStatus(204);
  res.clearCookie("jwt", cookieOptions);
  res.sendStatus(204);
};
