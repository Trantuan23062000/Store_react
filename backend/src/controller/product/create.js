import Joi from "joi";
import db from "../../models";
import { uploadImage } from "../../services/product/upload";
import { createProduct } from "../../services/product/create";

// Schema for request body validation
const productSchema = Joi.object({
  name: Joi.string().required(),
  description: Joi.string().required(),
  price: Joi.number().positive().required(),
  quantity: Joi.number().positive().required(),
  category: Joi.string().required(),
  brandId: Joi.string().required(),
});

const addProduct = async (req, res, next) => {
  try {
    // Validate request body

    const { error: validationError, value } = productSchema.validate(req.body);
    if (validationError) {
      return res
        .status(201)
        .json({ EC: 1, error: validationError.details[0].message });
    }

    const { name, description, price, quantity, category, brandId } = value;
    const files = req.files;

    if (!files || files.length === 0) {
      return res
        .status(201)
        .json({ EC: 1, error: "Please upload at least one image." });
    }

    if (files.length > 3) {
      return res
        .status(201)
        .json({
          EC: 1,
          error: "You can only upload up to 3 images at a time.",
        });
    }

    const uploadedImageUrls = [];
    const imageIds = [];
    for (const file of files) {
      // Upload image to Cloudinary
      const imageUrl = await uploadImage(file);

      // Check if the uploaded image URL already exists
      if (uploadedImageUrls.includes(imageUrl)) {
        return res.status(400).json({ error: "Duplicate images detected." });
      }
      uploadedImageUrls.push(imageUrl);

      // Save image URL to database and get image ID
      const imageId = await saveImageToDatabase(imageUrl);
      imageIds.push(imageId);
    }

    const { product, productImages } = await createProduct(
      name,
      description,
      price,
      quantity,
      category,
      brandId,
      imageIds
    );

    res.status(200).json({
      success: true,
      data: {
        product,
        productImages,
      },
      success: "Product added successfully.",
      EC: 0,
    });
  } catch (error) {
    next(error);
  }
};

const saveImageToDatabase = async (imageUrl) => {
  try {
    const newImage = await db.Images.create({ URL: imageUrl });
    return newImage.id;
  } catch (error) {
    throw error;
  }
};

module.exports = { addProduct };
