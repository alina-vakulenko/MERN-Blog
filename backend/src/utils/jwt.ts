import jwt from "jsonwebtoken";
import { ObjectId } from "mongoose";

import envVariables from "../env";

export interface IJwtPayload {
  _id: ObjectId;
  roles: number[];
}

export type Token = string;

export const jwtSign = (
  payload: IJwtPayload,
  secret: string,
  expiresIn: string
): Token => {
  return jwt.sign(payload, secret, { expiresIn });
};

export const jwtVerify = (token: Token, secret: string): IJwtPayload => {
  return jwt.verify(token, secret) as IJwtPayload;
};

export const generateAccessToken = (payload: IJwtPayload): Token => {
  const accessSecret: string = envVariables.ACCESS_TOKEN_SECRET;
  const expiresIn = `${envVariables.ACCESS_TOKEN_EXPIRES_IN_MINUTES}m`;
  const accessToken: Token = jwtSign(payload, accessSecret, expiresIn);
  return accessToken;
};

export const generateRefreshToken = (payload: IJwtPayload): Token => {
  const refreshSecret: string = envVariables.REFRESH_TOKEN_SECRET;
  const expiresIn: string = `${envVariables.REFRESH_TOKEN_EXPIRES_IN_DAYS}d`;
  const refreshToken: Token = jwtSign(payload, refreshSecret, expiresIn);
  return refreshToken;
};

export const decodeRefreshToken = (token: Token): IJwtPayload => {
  const secret: string = envVariables.REFRESH_TOKEN_SECRET;
  const decodedUser: IJwtPayload = jwtVerify(token, secret);
  return decodedUser;
};

export const decodeAccessToken = (token: Token): IJwtPayload => {
  const secret: string = envVariables.ACCESS_TOKEN_SECRET;
  const decodedUser: IJwtPayload = jwtVerify(token, secret);
  return decodedUser;
};
