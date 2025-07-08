import { body } from "express-validator";

export const validateLoginSuperAdminBody = [
  body("username")
    .trim()
    .notEmpty()
    .withMessage("Username is required")
    .bail()
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
