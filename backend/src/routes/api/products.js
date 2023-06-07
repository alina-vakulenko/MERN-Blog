import express from "express";

import { checkAuth, checkRoles } from "../../middleware/index.js";
import { ProductController } from "../../controllers/index.js";
import ROLES from "../../config/roles.js";

const router = express.Router();

router
  .route("/")
  .get(ProductController.getAll)
  .post(
    checkAuth,
    checkRoles(ROLES.Admin, ROLES.Editor),
    ProductController.create
  );

router
  .route("/:id")
  .get(ProductController.getOne)
  .patch(
    checkAuth,
    checkRoles(ROLES.Admin, ROLES.Editor),
    ProductController.update
  )
  .delete(checkAuth, checkRoles(ROLES.Admin), ProductController.remove);

export default router;
