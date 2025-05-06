import { AsyncHandler } from "../utils/AsyncHandler.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import User from "../models/user.model.js";
import { validationResult } from 'express-validator'

const signup = AsyncHandler(async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { username, email, password} = req.body

    if(!username || !email || !password){
        throw new ApiError(400, 'All Fields are required')
    }
    const esistedUser = await User.findOne({
        $or: [{ username }, { email }]
    })
    
    if(esistedUser){
        throw new ApiError(400, 'User with email or username already esists')
    }

    const user = await User.create({
        username,
        email,
        password
    })

    const createdUser = await User.findById(user._id).select('-password')

    if(!createdUser){
        throw new ApiError(500, "Something Went Wrong While signin the user")
    }

    return res.status(201).json(
        new ApiResponse(201, createdUser, "User Sign Successfully")
    )
})

export {
    signup
}