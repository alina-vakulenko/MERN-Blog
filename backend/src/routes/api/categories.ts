import express from "express";

import {
  deserializeUser,
  requireAuth,
  checkRoles,
  handleValidationErrors,
} from "../../middleware";
import { CategoryController } from "../../controllers";
import ROLES from "../../config/roles";
import { categoryValidation } from "../../validations";

const router = express.Router();

router
  .route("/")
  .get(CategoryController.getAll)
  .post(
    deserializeUser,
    requireAuth,
    checkRoles(ROLES.Admin, ROLES.Editor),
    categoryValidation.create,
    handleValidationErrors,
    CategoryController.create
  );

router
  .route("/:slug")
  .get(CategoryController.getOne)
  .patch(
    deserializeUser,
    requireAuth,
    checkRoles(ROLES.Admin, ROLES.Editor),
    categoryValidation.update,
    handleValidationErrors,
    CategoryController.update
  )
  .delete(
    deserializeUser,
    requireAuth,
    checkRoles(ROLES.Admin),
    CategoryController.remove
  );

export default router;
