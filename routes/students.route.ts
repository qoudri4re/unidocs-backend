import { Router } from "express";
import { initiateStudentSignup } from "../controllers/student.controller";
import { verifyOtp } from "../controllers/student.controller";
import { registerStudent } from "../controllers/student.controller";
import { loginStudent } from "../controllers/student.controller";
import { logoutStudent } from "../controllers/student.controller";
import { getStudentProfile } from "../controllers/student.controller";
import { authenticateJWT } from "../middlewares/authenticate.middleware";

const router = Router();

router.post("/initiate-signup", initiateStudentSignup);
router.post("/verify-otp", verifyOtp);
router.post("/register", registerStudent);
router.post("/login", loginStudent);
router.post("/logout", authenticateJWT, logoutStudent);
router.get("/profile", authenticateJWT, getStudentProfile);

export default router;
