import { Router } from "express";
import { signin, signup } from "../controller/auth.controller.js";
import { body } from "express-validator";

const router = Router()

router.route('/signup').post(
    [
        body('username').isLength({ min: 3}).withMessage('User name is atleast 3 character'),
        body('email').isEmail().withMessage('Email is invalid'),
        body('password').isLength({ min: 6 }).withMessage('Password too short'),
    ],
    signup
)

router.route('/signin').post(
    [
        body('email').isEmail().withMessage('Email is invalid'),
        body('password').isLength({ min: 6 }).withMessage('Password too short'),
    ],
    signin
)

export default router