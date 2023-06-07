import express from "express";

import { checkAuth, checkRoles } from "../../middleware/index.js";
import { UserController } from "../../controllers/index.js";
import ROLES from "../../config/roles.js";

const router = express.Router();

router
  .route("/")
  .get(checkAuth, checkRoles(ROLES.Admin, ROLES.Editor), UserController.getAll)
  .post(
    checkAuth,
    checkRoles(ROLES.Admin, ROLES.Editor),
    UserController.create
  );

router
  .route("/:id")
  .get(checkAuth, checkRoles(ROLES.Admin, ROLES.Editor), UserController.getOne)
  .patch(
    checkAuth,
    checkRoles(ROLES.Admin, ROLES.Editor),
    UserController.update
  )
  .delete(checkAuth, checkRoles(ROLES.Admin), UserController.remove);

export default router;
