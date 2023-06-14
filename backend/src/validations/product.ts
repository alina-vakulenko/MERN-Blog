import { body } from "express-validator";

export const create = [
  body("title", "Product title is required").isLength({ min: 3 }).isString(),
  body("price", "Product price is required").isNumeric(),
  body("description", "Product description should be a string")
    .optional()
    .isString(),
  body("images", "Expected array of images").optional().isArray(),
  body("category", "Category id is required").isMongoId(),
];
