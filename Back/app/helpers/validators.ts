import { body, ValidationChain } from 'express-validator';

export const createUserValidationRules: ValidationChain[] = [
  body("name").notEmpty().withMessage("Name is required"),
  body("email").isEmail().withMessage("Invalid email address"),
  body("role").notEmpty().withMessage("Role name is required"),
  body("password")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters long")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/
    )
    .withMessage(
      "Password must contain at least one digit, one lowercase letter, one uppercase letter, and be at least 8 characters long"
    ),
];



// Login validation rules
export const loginValidationRules = [
  // Validate email
  body("email").isEmail().withMessage("Invalid email address"),
  // Validate password
  body("password").notEmpty().withMessage("Password is required"),
];


export const taskValidationRules = [

  body("title").notEmpty().withMessage("Title is required"),

  body("description").notEmpty().withMessage("Description is required"),
];

export const taskUpdateValidationRules = [
  // Validate email
  body("title").notEmpty().withMessage("Title is required"),
  // Validate password
  body("description").notEmpty().withMessage("Description is required"),
];










