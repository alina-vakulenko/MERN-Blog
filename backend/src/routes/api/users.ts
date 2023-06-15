import express from "express";
import { userValidation } from "../../validations";
import {
  requireAuth,
  deserializeUser,
  checkRoles,
  handleValidationErrors,
} from "../../middleware";
import { UserController } from "../../controllers";
import ROLES from "../../config/roles";

const router = express.Router();

router
  .route("/")
  .get(
    deserializeUser,
    requireAuth,
    checkRoles(ROLES.Admin, ROLES.Editor),
    UserController.getAll
  )
  .post(userValidation.create, handleValidationErrors, UserController.create);
router.get("/me", deserializeUser, requireAuth, UserController.getMe);
router
  .route("/:id")
  .get(
    deserializeUser,
    requireAuth,
    checkRoles(ROLES.Admin, ROLES.Editor),
    UserController.getOne
  )
  .patch(
    deserializeUser,
    requireAuth,
    checkRoles(ROLES.Admin, ROLES.Editor),
    userValidation.update,
    handleValidationErrors,
    UserController.update
  )
  .delete(
    deserializeUser,
    requireAuth,
    checkRoles(ROLES.Admin),
    UserController.remove
  );

export default router;
