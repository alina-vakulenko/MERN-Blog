import express from "express";

import { deserializeUser, requireAuth, checkRoles } from "../../middleware";
import { ProductController } from "../../controllers";
import ROLES from "../../config/roles";

const router = express.Router();

router
  .route("/")
  .get(ProductController.getAll)
  .post(
    deserializeUser,
    requireAuth,
    checkRoles(ROLES.Admin, ROLES.Editor),
    ProductController.create
  );

router
  .route("/:id")
  .get(ProductController.getOne)
  .patch(
    deserializeUser,
    requireAuth,
    checkRoles(ROLES.Admin, ROLES.Editor),
    ProductController.update
  )
  .delete(
    deserializeUser,
    requireAuth,
    checkRoles(ROLES.Admin),
    ProductController.remove
  );

export default router;
