import { body } from "express-validator";

export const create = [
  body("slug", "Slug is required").isSlug(),
  body("name", "Add name of the category").isLength({ min: 3 }).isString(),
  body("imageUrl", "Invalid category image link").optional().isURL(),
];

export const update = [
  body("name", "Add name of the category").isLength({ min: 3 }).isString(),
  body("imageUrl", "Invalid category image link").optional().isURL(),
];
