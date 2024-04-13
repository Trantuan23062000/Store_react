import Joi from "joi";
import { addProductData } from "../../services/productSizeColor/create";

// Define Joi schema for validating request body
const productDataSchema = Joi.object({
  productId: Joi.string().required(),
  productvariants: Joi.array().items(
    Joi.object({
      color: Joi.string().required(),
      codeColor: Joi.string().required(),
      size: Joi.string().required(),
      description: Joi.string().required(),
      quantity: Joi.number().positive().required()
    })
  ).min(1).required(),
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
    res.status(200).json({ success: true, message: "Product data added successfully." });
  } catch (error) {
    console.log(error);
    // Handle errors
    next(error);
  }
};

module.exports = { addProductDataController };
