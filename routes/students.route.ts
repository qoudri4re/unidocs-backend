import { Router } from "express";
import {
  initiateStudentSignup,
  updateStudentProfile,
} from "../controllers/student.controller";
import { verifyOtp } from "../controllers/student.controller";
import { registerStudent } from "../controllers/student.controller";
import { loginStudent } from "../controllers/student.controller";
import { logoutStudent } from "../controllers/student.controller";
import { getStudentProfile } from "../controllers/student.controller";
import { authenticateJWT } from "../middlewares/authenticate.middleware";
import { validateInitiateStudentSignupBody } from "../middlewares/validation-rules/students/rules";
import { handleValidationErrors } from "../middlewares/validation-error.middleware";
import { validateVerifyOtpBody } from "../middlewares/validation-rules/students/rules";
import { validateRegisterStudentBody } from "../middlewares/validation-rules/students/rules";
import { validateLoginStudentBody } from "../middlewares/validation-rules/students/rules";
import { validateUpdateStudentProfileBody } from "../middlewares/validation-rules/students/rules";

const router = Router();

router.post(
  "/initiate-signup",
  validateInitiateStudentSignupBody,
  handleValidationErrors,
  initiateStudentSignup
);
router.post(
  "/verify-otp",
  validateVerifyOtpBody,
  handleValidationErrors,
  verifyOtp
);
router.post(
  "/register",
  validateRegisterStudentBody,
  handleValidationErrors,
  registerStudent
);
router.post(
  "/login",
  validateLoginStudentBody,
  handleValidationErrors,
  loginStudent
);
router.post("/logout", authenticateJWT, logoutStudent);
router.get("/profile", authenticateJWT, getStudentProfile);
router.put(
  "/profile",
  authenticateJWT,
  validateUpdateStudentProfileBody,
  handleValidationErrors,
  updateStudentProfile
);

export default router;
