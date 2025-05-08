import { v2 as cloudinary } from 'cloudinary'
import fs from 'fs'

//cloudinary configration
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const uploadOnCloudinary = async (localFilePath) => {
    try {
        if(!localFilePath){
            return null
        }
        const response = await cloudinary.uploader.upload(localFilePath, {resource_type: "auto", folder: "Dina_patra"})

        console.log("File uploaded successfully on cloudinary");
        
        if(fs.existsSync(localFilePath)){
            fs.unlinkSync(localFilePath)
        }
        console.log(fs.existsSync(localFilePath));
        return response
    } catch (error) {
        console.log("Error while uploading the file into cloudinary ",error);
        if(fs.existsSync(localFilePath)){
            fs.unlinkSync(localFilePath)
        }
        return null
    }
}

export default uploadOnCloudinary

