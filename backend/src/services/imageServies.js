import cloudinary from "../middleware/upload"

const CreateImage = async(file)=>{
   try {
    const result = await cloudinary.uploader.upload(file.path);
    return result.secure_url;
   } catch (error) {
    console.error('Error uploading image to Cloudinary:', error);
    throw error;
   }
}
module.exports = {
    CreateImage
}