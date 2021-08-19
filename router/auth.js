import express from 'express';
import {} from 'express-async-errors';
import { body } from 'express-validator';
import { validate } from '../middleware/validator.js';
import * as authController from '../controller/auth.js';
import { isAuth } from '../middleware/auth.js';
const router  = express.Router();

const validateCrediental = [ 
    body('username')
    .trim()
    .notEmpty()
    .withMessage('username at least 5'),
    body('password')
    .trim()
    .isLength({min:5})
    .withMessage('passwword at least 5'),
 validate,


];

const validateSignup = [
    ...validateCrediental,
    body('name').notEmpty().withMessage('name is missing'),
    body('email').isEmail().normalizeEmail().withMessage('invalid email'),
    body('url')
    .isURL()
    .withMessage('invalid URL')
    .optional({ nullable:true, checkFalsy:true}), //없어도 괜찮다
 validate,

];

router.post('/signup',validateSignup,authController.signup);
router.post('/login',validateCrediental,authController.login);
router.get('/me',isAuth,authController.me);

export default router;