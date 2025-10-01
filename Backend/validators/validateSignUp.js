import {body} from 'express-validator';

export const signUpValidator = [
    body('email').isEmail().withMessage("Please provide valid email"),

    body('password').isLength({min:8}).withMessage("Password length must be greater than 8 characters")
    .matches(/[0-9]/).withMessage("Password must contain atleast one number")
    .matches(/[a-z]/).withMessage('Password must contain at least one lowercase letter')
    .matches(/[A-Z]/).withMessage('Password must contain at least one uppercase letter')
    .custom( (password, {req}) =>{
      if(password !== req.body.confirmPassword){throw new Error("Passwords doesn't match")}
      return true; 
    }),

    body('name').trim().notEmpty().withMessage('Name is required')
];

export const loginUserValidator = [
  body('email').isEmail().withMessage('Provide valid email'),
  body('password').notEmpty().withMessage('Please enter password')
];