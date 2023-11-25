import {v2 as cloudinary} from "cloudinary"
import fs from "fs"


          
cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRECT 
});


// Extending method
const uploadCloudinary = async (localFilePath) => {
    try {
        if(!localFilePath) return null
        // upload the file on cloudinary
      const responce = await cloudinary.uploader.upload(localFilePath,{
            resource_type:"auto"
        })
        // file hs the uploaded succesfully
        console.log("file is uploaded successfully",responce.url)
        return responce
    } catch (error) {
        fs.unlinkSync(localFilePath) // remove the locally saved tempory file as the upload operation falied
        return null
        
    }

}

export {uploadCloudinary}

// cloudinary.v2.uploader.upload("https://upload.wikimedia.org/wikipedia/commons/a/ae/Olympic_flag.jpg",
//   { public_id: "olympic_flag" }, 
//   function(error, result) {console.log(result); });