import { Router, Request, Response, NextFunction } from "express";
import { dashboard } from "../controllers/super-admin.controller";
import { validateLoginSuperAdminBody } from "../middlewares/validation-rules/super-admin/rules";
import { handleValidationErrors } from "../middlewares/validation-error.middleware";
import { loginSuperAdmin } from "../controllers/super-admin.controller";

const router = Router();

router.get("/", dashboard);
router.post(
  "/login",
  validateLoginSuperAdminBody,
  handleValidationErrors,
  loginSuperAdmin
);

export default router;
