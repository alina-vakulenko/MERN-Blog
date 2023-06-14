import { NextFunction, Request, Response } from "express";

export default (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = res.locals.user;
    if (!user) {
      return res.status(401).json({ message: "You are not logged in" });
    }

    next();
  } catch (err: any) {
    next(err);
  }
};
