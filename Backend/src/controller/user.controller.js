import { AsyncHandler } from "../utils/AsyncHandler.js";
import User from "../models/user.model.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";


const getuser = AsyncHandler(async(req, res, next) =>{
    const userId = req.user._id

    const user = await User.findById(userId).select('-password')

    if(!user){
        throw new ApiError(404, "User not found")
    }
    return res.status(200).json(
        new ApiResponse(200,"User fetched successfully",user)
    )
})

const signout = AsyncHandler(async(req, res, next) => {
    return res.clearCookie('token').status(200).json(
        new ApiResponse(200,"User has been loggedout successfully")
    )
})
export {
    getuser,
    signout
}