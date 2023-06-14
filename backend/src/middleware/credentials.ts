import { NextFunction, Request, Response } from "express";
import allowedOrigins from "../config/allowedOrigins";

export default (req: Request, res: Response, next: NextFunction): void => {
  const origin = req.headers.origin;
  if (origin && allowedOrigins.includes(origin)) {
    res.setHeader("Access-Control-Allow-Credentials", "true");
  }
  next();
};
