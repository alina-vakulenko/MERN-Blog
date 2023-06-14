import { body } from "express-validator";

export const login = [
  body("email", "Invalid email").isEmail(),
  body("password", "Password should be at least 8 characters long").isLength({
    min: 8,
  }),
];
