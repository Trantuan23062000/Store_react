import cloudinary from "../../middleware/upload";
import db from "../../models";
const uploadImage = async (file) => {
    try {
      const result = await cloudinary.uploader.upload(file.path);
      const imageURL = result.secure_url;
      const newImage = await db.Images.create({ URL: imageURL });
      return newImage.id;
    } catch (error) {
      throw error;
    }
  };
  
  module.exports = { uploadImage };