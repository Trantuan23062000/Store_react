import cloudinary from "../middleware/upload";
import db from "../models";

const Upload = async (file) => {
  try {
    const result = await cloudinary.uploader.upload(file.path);
    return result.secure_url;
  } catch (error) {
    console.error("Error uploading image to Cloudinary:", error);
    throw error;
  }
};

const isImageExists = async (url) => {
  const image = await db.Images.findOne({ where: { URL: url } });
  return image !== null;
};

const CreateImage = async (fileData) => {
  try {
    const imageURL = await Upload(fileData);

    const imageExists = await isImageExists(imageURL);

    if (imageExists) {
      throw new Error("Image already exists!");
    }
    const images = await db.Images.create({ URL: imageURL });

    return images;
  } catch (error) {
    console.error("Error creating image:", error);
    throw error;
  }
};

const getImages = async () => {
  try {
    const images = await db.Images.findAll();

    return {
      EM: "Get Image success",
      EC: 0,
      images,
    };
  } catch (error) {
    console.error("Error fetching images:", error);
    throw error;
  }
};

module.exports = {
  CreateImage,getImages
};
