import {v2 as cloudinary} from "cloudinary"
import dotenv from "dotenv"
dotenv.config()


cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_secret : process.env.CLOUDINARY_API_SECRET ,
    api_key: process.env.CLOUDINARY_API_KEY

})

export default cloudinary

export const uploadPhoto = (buffer, folder = "photos") => {
  const base64 = buffer.toString("base64");
  const dataUri = `data:image/jpeg;base64,${base64}`; 
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload(
      dataUri,
      { folder },
      (error, result) => {
        if (error) return reject(error);
        resolve(result);
      }
    );
  });
};
  
  export const deletePhoto = async (publicId) => {
    try {
      const result = await cloudinary.uploader.destroy(publicId);
      return result; 
    } catch (err) {
      throw new Error(err.message);
    }
  };