import { body, validationResult } from "express-validator";
import validator from "validator";

export const validateInitiateStudentSignupBody = [
  body("full_name")
    .trim()
    .notEmpty()
    .withMessage("Full name is required")
    .bail()
    .escape(),

  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email is required")
    .bail()
    .isEmail()
    .withMessage("Invalid email format")
    .bail()
    .normalizeEmail()
    .escape(),

  body("phone_number")
    .trim()
    .notEmpty()
    .withMessage("Phone number is required")
    .bail()
    .isMobilePhone("en-NG")
    .withMessage("Invalid phone number format")
    .bail()
    .escape(),

  body("verification_channel")
    .trim()
    .notEmpty()
    .withMessage("Verification channel is required")
    .bail()
    .escape()
    .isIn(["email", "phone"])
    .withMessage("Verification channel must be email or phone"),
];

export const validateVerifyOtpBody = [
  body("contact_value")
    .trim()
    .notEmpty()
    .withMessage("Contact value is required")
    .bail()
    .custom((value) => {
      const isEmail = validator.isEmail(value);
      const isPhone = validator.isMobilePhone(value, "en-NG");
      if (!isEmail && !isPhone) {
        throw new Error("Invalid email or phone number");
      }
      return true;
    })
    .customSanitizer((value) => {
      if (validator.isEmail(value)) {
        return validator.normalizeEmail(value);
      }
      return value;
    })
    .escape(),

  body("otp")
    .trim()
    .notEmpty()
    .withMessage("OTP is required")
    .bail()
    .isLength({ min: 6, max: 6 })
    .withMessage("OTP must be 6 digits")
    .escape(),
];

export const validateRegisterStudentBody = [
  body("contact_value")
    .trim()
    .notEmpty()
    .withMessage("Contact value is required")
    .bail()
    .custom((value) => {
      const isEmail = validator.isEmail(value);
      const isPhone = validator.isMobilePhone(value, "en-NG");
      if (!isEmail && !isPhone) {
        throw new Error("Invalid email or phone number");
      }
      return true;
    })
    .customSanitizer((value) => {
      if (validator.isEmail(value)) {
        return validator.normalizeEmail(value);
      }
      return value;
    })
    .escape(),

  body("password")
    .trim()
    .notEmpty()
    .withMessage("Password is required")
    .bail()
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long")
    .escape(),
];

export const validateLoginStudentBody = [
  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email is required")
    .bail()
    .isEmail()
    .withMessage("Invalid email format")
    .bail()
    .normalizeEmail()
    .escape(),

  body("password")
    .trim()
    .notEmpty()
    .withMessage("Password is required")
    .bail()
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long")
    .escape(),
];

export const validateUpdateStudentProfileBody = [
  body("full_name")
    .trim()
    .notEmpty()
    .withMessage("Full name is required")
    .bail()
    .escape(),

  body("matric_number").escape(),

  body("graduation_year").escape(),

  body("program").escape(),

  body("department").escape(),

  body("school_id").trim().escape(),
];
