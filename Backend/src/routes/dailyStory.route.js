import { Router } from "express";

const router = Router()

import { body } from "express-validator";

import upload from "../middleware/multer.middleware.js";
import { addDailyStory, editDailyStory, getAllDailyStory } from "../controller/dailyStory.controller.js";
import verifyJWT from "../middleware/auth.middleware.js";

router.route('/add').post(
    // if you send userid in form data then no need to add verifyJWT other wise we have to addach the verify authontication field in it
    // verifyJWT,
    upload.single('image'),
    [
        body("title").notEmpty().withMessage("Title is required"),
        body("story").notEmpty().withMessage("Story is required"),
        body("quote").notEmpty().withMessage("Quote is required"),
        body("visitedDate").notEmpty().withMessage("Visited date is required"),
    ],
    // Ensure the image field in the form uses name="image" so it matches upload.single("image").
    addDailyStory
)

router.route('/get-allstory').get(
    verifyJWT,
    getAllDailyStory
)

router.route('/edit-story/:id').put(verifyJWT,
    upload.single("image"),
    editDailyStory)

export default router 