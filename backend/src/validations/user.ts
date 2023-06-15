import { body } from "express-validator";

export const create = [
  body("email", "Invalid email").isEmail(),
  body("password", "Password should be at least 8 characters long").isLength({
    min: 8,
  }),
  body("name", "Username should be at least 4 characters long").isLength({
    min: 4,
  }),
  body("avatarUrl", "Avatar should be URL").optional().isURL(),
];

export const update = [
  body("name", "Username should be at least 4 characters long").isLength({
    min: 4,
  }),
  body("avatarUrl", "Avatar should be URL").optional().isURL(),
];

export const password = [
  body("password", "Password should be at least 8 characters long").isLength({
    min: 8,
  }),
];
