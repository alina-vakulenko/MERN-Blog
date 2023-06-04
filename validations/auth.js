import { body } from "express-validator";

export const login = [
  body("email", "Invalid email").isEmail(),
  body("password", "Password should be at least 8 characters long").isLength({
    min: 8,
  }),
];

export const register = [
  body("email", "Invalid email").isEmail(),
  body("password", "Password should be at least 8 characters long").isLength({
    min: 8,
  }),
  body("name", "Password should be at least 4 characters long").isLength({
    min: 4,
  }),
  body("avatarUrl", "Avatar should be URL").optional().isURL(),
];
