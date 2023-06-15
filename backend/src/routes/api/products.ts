import express from "express";

import {
  deserializeUser,
  requireAuth,
  checkRoles,
  handleValidationErrors,
} from "../../middleware";
import { ProductController } from "../../controllers";
import ROLES from "../../config/roles";
import { productValidation } from "../../validations";

const router = express.Router();

router
  .route("/")
  .get(ProductController.getAll)
  .post(
    deserializeUser,
    requireAuth,
    checkRoles(ROLES.Admin, ROLES.Editor),
    productValidation.create,
    handleValidationErrors,
    ProductController.create
  );

router
  .route("/:id")
  .get(ProductController.getOne)
  .patch(
    deserializeUser,
    requireAuth,
    checkRoles(ROLES.Admin, ROLES.Editor),
    productValidation.create,
    handleValidationErrors,
    ProductController.update
  )
  .delete(
    deserializeUser,
    requireAuth,
    checkRoles(ROLES.Admin),
    ProductController.remove
  );

export default router;
