import cloudinary from "../middleware/upload";
import db from "../models";
import fs from "fs";
import path from "path";

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
    //console.log(images);
    return images;
  } catch (error) {
    console.error("Error creating image:", error);
    throw error;
  }
};

const getImages = async (page, pageSize) => {
  try {
    const offset = (page - 1) * pageSize;
    const totalImages = await db.Images.count();
    const images = await db.Images.findAll({
      limit: pageSize,
      offset,
      attributes: ["id", "URL"],
      order: [["URL", "DESC"]],
    });
    return { images, totalImages };
  } catch (error) {
    console.error("Error fetching images:", error);
    throw error;
  }
};

const UploadImageToCloudinary = async (filePath) => {
  try {
    const result = await cloudinary.uploader.upload(filePath);
    return result.secure_url;
  } catch (error) {
    console.error("Error uploading image to Cloudinary:", error);
    throw error;
  }
};

const UpdateImage = async (imageId, newImageUrl) => {
  try {
    const image = await db.Images.findByPk(imageId);
    if (!image) {
      throw new Error("Image not found");
    }

    const oldUrl = image.URL;

    // Delete old image from Cloudinary
    const publicId = getPublicIdFromUrl(oldUrl);
    await cloudinary.uploader.destroy(publicId);

    // Delete old image file from server directory
    const oldImagePath = path.join(__dirname, "../uploads", oldUrl);
    console.log(oldImagePath);
    if (!fs.existsSync(oldImagePath)) {
      fs.unlink(oldImagePath, (err) => {
        if (err) {
          console.error("Error deleting old image file:", err);
        } else {
          console.log("Old image file deleted successfully");
        }
      });
    }

    // Update image URL in the database
    image.URL = newImageUrl;
    await image.save();

    return image;
  } catch (error) {
    console.error("Error updating image:", error);
    throw new Error("Failed to update image");
  }
};

const getPublicIdFromUrl = (url) => {
  const parts = url.split("/");
  const fileName = parts[parts.length - 1];
  const publicId = fileName.split(".")[0];
  return publicId;
};

module.exports = {
  CreateImage,
  getImages,
  UpdateImage,
  UploadImageToCloudinary,
};
