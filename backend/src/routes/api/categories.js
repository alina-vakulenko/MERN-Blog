import express from "express";

import { checkAuth, checkRoles } from "../../middleware/index.js";
import { CategoryController } from "../../controllers/index.js";
import ROLES from "../../config/roles.js";

const router = express.Router();

router
  .route("/")
  .get(CategoryController.getAll)
  .post(
    checkAuth,
    checkRoles(ROLES.Admin, ROLES.Editor),
    CategoryController.create
  );

router
  .route("/:id")
  .get(CategoryController.getOne)
  .patch(
    checkAuth,
    checkRoles(ROLES.Admin, ROLES.Editor),
    CategoryController.update
  )
  .delete(checkAuth, checkRoles(ROLES.Admin), CategoryController.remove);

export default router;
