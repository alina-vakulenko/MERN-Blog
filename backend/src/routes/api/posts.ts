import express from "express";
import { postValidation } from "../../validations";
import {
  deserializeUser,
  requireAuth,
  handleValidationErrors,
} from "../../middleware";
import { PostController } from "../../controllers";

const router = express.Router();

router
  .route("/")
  .get(PostController.getAll)
  .post(
    deserializeUser,
    requireAuth,
    postValidation.create,
    handleValidationErrors,
    PostController.create
  );

router
  .route("/:id")
  .get(PostController.getOne)
  .patch(
    deserializeUser,
    requireAuth,
    postValidation.create,
    handleValidationErrors,
    PostController.update
  )
  .delete(deserializeUser, requireAuth, PostController.remove);

export default router;
