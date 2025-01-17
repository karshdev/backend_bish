
import { body } from 'express-validator';


export const createAddress = [

  body('postalCode')
    .matches(/^[A-Z]{1,2}[0-9]{1,2}$/)
    .withMessage('Postal code must match the UK-like format (e.g., W2, E4, SE3)'),


];

