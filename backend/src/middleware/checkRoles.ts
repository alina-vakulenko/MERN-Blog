import { NextFunction, Request, Response } from "express";

export default (...allowedRoles: number[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const roles: number[] = res.locals.roles;
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
