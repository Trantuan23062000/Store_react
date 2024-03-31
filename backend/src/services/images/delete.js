import cloudinary from "../../middleware/upload"
import db from "../../models/index";

const DeleteImage = async(imageId) =>{
    try {
        const image = await db.Images.findByPk(imageId);
        if (!image) {
          console.log("Image not found");
        }
        await image.destroy();
        return {
          image
        };
      } catch (error) {
        console.log(error);
      }
}
module.exports = {
    DeleteImage
}