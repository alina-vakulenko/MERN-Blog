import { NextFunction, Request, Response } from "express";
import { Roles } from "../types/user";

export default (...allowedRoles: Roles) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const roles: Roles = res.locals.user.roles;
    if (!roles?.length)
      return res.status(401).json({ message: "You are not logged in" });

    if (!roles.some((role: number) => allowedRoles.includes(role))) {
      return res
        .status(403)
        .json({ message: "You are not allowed to perform this action" });
    }

    next();
  };
};
