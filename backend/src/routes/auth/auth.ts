import express from "express";

import { authValidation } from "../../validations";
import { handleValidationErrors } from "../../middleware";
import { AuthController } from "../../controllers";

const router = express.Router();

router.post(
  "/login",
  authValidation.login,
  handleValidationErrors,
  AuthController.login
);
router.post("/logout", AuthController.logout);
router.get("/refresh", AuthController.refresh);

export default router;
