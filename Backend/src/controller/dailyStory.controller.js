import DailyStory from "../models/dailyStory.model.js";

import ApiResponse from "../utils/ApiResponse.js";
import { AsyncHandler } from "../utils/AsyncHandler.js";
import ApiError from "../utils/ApiError.js";
import uploadOnCloudinary from "../utils/UploadOnCloudinary.js";
import User from "../models/user.model.js";

import { validationResult } from "express-validator";

const addDailyStory = AsyncHandler(async (req, res) => {

    console.log("Body.Request", req.body)

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { title, story, quote, visitedDate } = req.body
    const userId = req.body.userId
    console.log("File Path", req.file?.path);

    const imageLocalPath = req.file?.path
    console.log("Local file path:", imageLocalPath); // should show something like 'public/temp/image.jpg'
    if (!title || !story || !quote || !visitedDate) {
        throw new ApiError(400, "All fields are required")
    }
    if (!imageLocalPath) {
        throw new ApiError(400, "Image is Required")
    }

    // convert visited date from miliseconds to Date Object
    const parsedVisitedDate = new Date(parseInt(visitedDate))

    const image = await uploadOnCloudinary(imageLocalPath)

    console.log(image);

    if (!image) {
        throw new ApiError(400, "Image was not uploaded to Cloudinary")
    }

    const dailyStory = await DailyStory.create({
        title,
        story,
        quote,
        userId,
        image: image.url,
        visitedDate: parsedVisitedDate
    })

    const createdDailyStory = await DailyStory.findById(dailyStory._id)

    if (!createdDailyStory) {
        throw new ApiError(400, "Something went wrong while uploading the daily story")
    }

    return res.status(200).json(
        new ApiResponse(200, "story uploaded successfully", { createdDailyStory })
    )

})


const getAllDailyStory = AsyncHandler(async (req, res) => {
    const userId = req.user._id

    const dailyStories = await DailyStory.find({ userId: userId }).sort({ isFavourite: -1 })

    if (!dailyStories) {
        throw new ApiError(400, "No Story Found")
    }

    return res.status(200).json(
        new ApiResponse(200, "Add stories", { dailyStories })
    )
})

const editDailyStory = AsyncHandler(async (req, res) => {
    const { id } = req.params
    console.log("req.body is ",req.body);
    console.log("req.file is ",req.file);
    
    const { title, story, quote, visitedDate } = req.body

    const imageLocalPath = req.file?.path
    console.log("Image local path",imageLocalPath);
    
    const userid = req.user._id

    
    if (!title || !story || !quote || !visitedDate) {
        throw new ApiError(400, "All fields are required")
    }
    
    const parsedVisitedDate = new Date(parseInt(visitedDate))

    const storytoUpload = await DailyStory.findById(id)

    if (!storytoUpload) {
        throw new ApiError(404, "Story Not Found")
    }

    // delete old image from cloudinary --> TODO

    let image = storytoUpload.image

    if (imageLocalPath) {
        const newImage = await uploadOnCloudinary(imageLocalPath)
        if (!newImage) {
            throw new ApiError(400, "Image was not uploaded to cloudinary")
        }
        image = newImage.url
    }

    const updatedStory = await DailyStory.findByIdAndUpdate(
        id,
        {
            title,
            story,
            quote,
            visitedDate: parsedVisitedDate,
            image: image,
            userid
        },
        { new: true }
    )
    return res.status(200).json(
        new ApiResponse(200, "Story updated successfully", updatedStory)
    );
})


export {
    addDailyStory,
    getAllDailyStory,
    editDailyStory,

}