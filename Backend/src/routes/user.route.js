import { Router } from "express";

// import { body } from "express-validator";
import verifyJWT from "../middleware/auth.middleware.js";
import { getuser, signout } from "../controller/user.controller.js";

const router = Router()

router.route('/getuser').get(verifyJWT, getuser)

router.route('/signout').post(verifyJWT,signout)

export default router