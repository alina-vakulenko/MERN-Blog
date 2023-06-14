import express from "express";

import { deserializeUser, requireAuth, checkRoles } from "../../middleware";
import { CategoryController } from "../../controllers";
import ROLES from "../../config/roles";

const router = express.Router();

router
  .route("/")
  .get(CategoryController.getAll)
  .post(
    deserializeUser,
    requireAuth,
    checkRoles(ROLES.Admin, ROLES.Editor),
    CategoryController.create
  );

router
  .route("/:id")
  .get(CategoryController.getOne)
  .patch(
    deserializeUser,
    requireAuth,
    checkRoles(ROLES.Admin, ROLES.Editor),
    CategoryController.update
  )
  .delete(
    deserializeUser,
    requireAuth,
    checkRoles(ROLES.Admin),
    CategoryController.remove
  );

export default router;
