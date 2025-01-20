
import { body } from 'express-validator';

export const createUser = [
    body('first_name')
    .isString()
    .withMessage('First name must be a string')
    .notEmpty()
    .withMessage('First name is required'),

  body('last_name')
    .isString()
    .withMessage('Last name must be a string')
    .notEmpty()
    .withMessage('Last name is required'),

  body('email')
    .isEmail()
    .withMessage('Email must be a valid email address')
    .notEmpty()
    .withMessage('Email is required'),

  // body('mobile')
  //   .matches(/^(\+44\s?7\d{3}|\(?07\d{3}\)?)\s?\d{3}\s?\d{3}$/)
  //   .withMessage('Mobile must be a valid UK phone number starting with +44 or 07')
  //   .notEmpty()
  //   .withMessage('Mobile number is required'),

  body('address')
    .isString()
    .withMessage('Address must be a string')
    .notEmpty()
    .withMessage('Address is required'),

  body('postalCode')
    .isMongoId()
    .withMessage('Postal code must be a valid MongoDB ObjectId')
    .notEmpty()
    .withMessage('Postal code is required')
];


export const updateUser = [
    body('name').notEmpty().withMessage('name is required').isString().withMessage('name must be a string'),
    body('email').notEmpty().withMessage('email is required').isString().withMessage('email must be a string'),
    body('active').isBoolean().withMessage('active must be a boolean'),
    body('password').notEmpty().withMessage('password is required').isString().withMessage('password must be a string'),
];

export const editUser = [
    body('name').isString().withMessage('name must be a string'),
    body('email').isString().withMessage('email must be a string'),
    body('active').isBoolean().withMessage('active must be a boolean'),
    body('password').isString().withMessage('password must be a string'),
];
