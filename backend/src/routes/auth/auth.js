import express from "express";

import { authValidation } from "../../validations/index.js";
import { checkAuth, handleValidationErrors } from "../../middleware/index.js";
import { AuthController } from "../../controllers/index.js";

const router = express.Router();

router.post(
  "/register",
  authValidation.register,
  handleValidationErrors,
  AuthController.register
);
router.post(
  "/login",
  authValidation.login,
  handleValidationErrors,
  AuthController.login
);
router.post("/logout", AuthController.logout);
router.get("/me", checkAuth, AuthController.getMe);
router.get("/refresh", AuthController.refresh);

export default router;
