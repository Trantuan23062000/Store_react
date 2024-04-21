import Joi from "joi";
import { addProductData } from "../../services/productSizeColor/create";

// Define Joi schema for validating request body
const productDataSchema = Joi.object({
  productId: Joi.string().required().messages({
    'any.required': 'Product ID is required.',
    'string.empty': 'Product ID cannot be empty.'
  }),
  productvariants: Joi.array().items(
    Joi.object({
      color: Joi.string().required().messages({
        'any.required': 'Color is required.',
        'string.empty': 'Color cannot be empty.'
      }),
      codeColor: Joi.string().required().messages({
        'any.required': 'Code color is required.',
        'string.empty': 'Code color cannot be empty.'
      }),
      size: Joi.string().required().messages({
        'any.required': 'Size is required.',
        'string.empty': 'Size cannot be empty.'
      }),
      description: Joi.string().required().messages({
        'any.required': 'Description is required.',
        'string.empty': 'Description cannot be empty.'
      }),
      quantity: Joi.number().positive().required().messages({
        'any.required': 'Quantity is required.',
        'number.positive': 'Quantity must be a positive number.'
      })
    })
  ).min(1).required().messages({
    'any.required': 'At least one product variant is required.',
    'array.min': 'At least one product variant is required.'
  }),
});

const addProductDataController = async (req, res, next) => {
  try {
    // Validate request body
    const { error, value } = productDataSchema.validate(req.body);
    if (error) {
      return res.status(201).json({ error: error.details[0].message });
    }

    // Extract validated data
    const { productId, productvariants } = value;

    // Call service function to add product data
    await addProductData(productId, productvariants);

    // Send success response
    res.status(200).json({ EC:0, message: "Product data added successfully." });
  } catch (error) {
    console.log(error);
    // Handle errors
    next(error);
  }
};

module.exports = { addProductDataController };
