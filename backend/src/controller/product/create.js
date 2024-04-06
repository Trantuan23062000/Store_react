import Joi from 'joi';
import db from '../../models';
import { uploadImage } from '../../services/product/upload';
import { createProduct } from '../../services/product/create';

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
      return res.status(400).json({ error: validationError.details[0].message });
    }

    const { name, description, price, quantity, category, brandId } = value;
    const files = req.files;

    if (!files || files.length === 0) {
      return res.status(400).json({ error: 'Please upload at least one image.' });
    }

    if (files.length > 3) {
      return res.status(400).json({ error: 'You can only upload up to 3 images at a time.' });
    }

    // Check if the product name already exists
    const existingProduct = await db.Products.findOne({ where: { name } });
    if (existingProduct) {
      return res.status(400).json({ error: 'Product with the same name already exists.' });
    }

    const imageIds = [];
    for (const file of files) {
      const imageId = await uploadImage(file);
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

    res.status(201).json({
      success: true,
      data: {
        product,
        productImages,
      },
      message: 'Product added successfully.',
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {addProduct};
