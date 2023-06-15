import { NextFunction, Request, Response } from "express";

import { decodeAccessToken } from "../utils/jwt";

export default (req: Request, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization || req.headers.Authorization;

    let jwtBearerHeader;
    if (typeof authHeader === "string") {
      if (authHeader.startsWith("Bearer")) {
        jwtBearerHeader = authHeader;
      }
    } else if (Array.isArray(authHeader)) {
      jwtBearerHeader = authHeader.find((header) =>
        header.startsWith("Bearer")
      );
    }

    if (!jwtBearerHeader) {
      return res.status(401).json({ message: "You are not logged in" });
    }

    const token = jwtBearerHeader.split(" ")[1];
    const decodedUser = decodeAccessToken(token);
    res.locals.user = decodedUser;
    next();
  } catch (err) {
    return res.sendStatus(403);
  }
};
