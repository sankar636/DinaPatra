import { Router } from "express";

// import { body } from "express-validator";
import verifyJWT from "../middleware/auth.middleware.js";
import { getuser } from "../controller/user.controller.js";

const router = Router()

router.route('/getuser').get(verifyJWT, getuser)

export default router