import { CookieOptions } from "express";

import envVariables from "../env";
const refreshTokenExpiresInDays = envVariables.REFRESH_TOKEN_EXPIRES_IN_DAYS;

const cookieOptions: CookieOptions = {
  httpOnly: true,
  sameSite: "none",
  maxAge: refreshTokenExpiresInDays * 24 * 60 * 60 * 1000,
};

if (envVariables.NODE_ENV === "production") cookieOptions.secure = true;

export default cookieOptions;
