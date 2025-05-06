import { Router } from "express";
import { signup } from "../controller/auth.controller.js";
import { body } from "express-validator";

const router = Router()

router.route('/signup').post(
    [
        body('email').isEmail().withMessage('Email is invalid'),
        body('password').isLength({ min: 6 }).withMessage('Password too short'),
    ],
    signup
)

export default router