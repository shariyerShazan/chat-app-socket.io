import {v2 as cloudinary} from "cloudinary"
import dotenv from "dotenv"
dotenv.config()


cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_secret : process.env.CLOUDINARY_API_SECRET ,
    api_key: process.env.CLOUDINARY_API_KEY

})

export default cloudinary

export const uploadPhoto = (filePathOrUrl, folder = "photos") => {
    return new Promise((resolve, reject) => {
      cloudinary.uploader.upload(filePathOrUrl, { folder }, (error, result) => {
        if (error) return reject(error);
        resolve(result); 
      });
    });
  };
  
  export const deletePhoto = async (photoUrlOrPublicId) => {
    try {
      let publicId = photoUrlOrPublicId;
  
      if (photoUrlOrPublicId.startsWith("http")) {
        const parts = photoUrlOrPublicId.split("/");
        const fileWithExt = parts[parts.length - 1]; 
        publicId = fileWithExt.substring(0, fileWithExt.lastIndexOf(".")); 
      }
  
      const result = await cloudinary.uploader.destroy(publicId);
      return result; 
    } catch (err) {
      throw new Error(err.message);
    }
  };