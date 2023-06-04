import { body } from "express-validator";

export const create = [
  body("title", "Add post title").isLength({ min: 3 }).isString(),
  body("text", "Add post text")
    .isLength({
      min: 10,
    })
    .isString(),
  body("tags", "Add list of tags").optional().isString(),
  body("imageUrl", "Invalid post link").optional().isString(),
];
