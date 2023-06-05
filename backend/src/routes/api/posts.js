import express from "express";
import { postValidation } from "../../validations/index.js";
import { checkAuth, handleValidationErrors } from "../../middleware/index.js";
import { PostController } from "../../controllers/index.js";

const router = express.Router();

router
  .route("/")
  .get(PostController.getAll)
  .post(
    checkAuth,
    postValidation.create,
    handleValidationErrors,
    PostController.create
  );

router
  .route("/:id")
  .get(PostController.getOne)
  .patch(
    checkAuth,
    postValidation.create,
    handleValidationErrors,
    PostController.update
  )
  .delete(checkAuth, PostController.remove);

export default router;
