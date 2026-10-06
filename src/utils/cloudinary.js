import { v2 as cloudinary } from "cloudinary";
import { log } from "console";
import fs from 'fs'

// ye config h jo file upload krne ki permission degi verna isko kese pata ki konsa account aur konsa login

    cloudinary.config({ 
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        api_key: CLOUDINARY_API_KEY, 
        api_secret: CLOUDINARY_API_SECRET
    });
    

    const uploadOnCloudinary = async (localFilePath) =>{
        try {
            if(!localFilePath) return null;
            
            // upload file on cloudinary
        const response = await cloudinary.uploader.upload(localFilePath, {
                resource_type: "auto"
            })
            // file has been uploaded successfully
            console.log("file is uploaded on cloudinary", response.url);
            return response;
            
        } catch (error) {
            fs.unlinkSync(localFilePath)   // remove the locally saved temporary file as the upload operation got failed
            return null;
        }
    }
  
    export {uploadOnCloudinary}