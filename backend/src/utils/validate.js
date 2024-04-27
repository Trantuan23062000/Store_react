import Joi from "joi"
const validateProductData = (data) => {
    const schema = Joi.object({
        productId: Joi.string().required().messages({
            'any.required': 'Product ID is required.',
        }),
        productvariants: Joi.array().items(Joi.object({
            color: Joi.string().required().messages({
                'any.required': 'Color is required.',
                'string.base': 'Color must be a string.'
            }),
            codeColor: Joi.string().required().messages({
                'any.required': 'Code color is required.',
                'string.base': 'Code color must be a string.'
            }),
            size: Joi.string().required().messages({
                'any.required': 'Size is required.',
                'string.base': 'Size must be a string.'
            }),
            description: Joi.string().required().messages({
                'any.required': 'Description is required.',
                'string.base': 'Description must be a string.'
            }),
            quantity: Joi.number().required().messages({
                'any.required': 'Quantity is required.',
                'number.base': 'Quantity must be a number.'
            })
        })).required().messages({
            'any.required': 'Product variants data is required.'
        })
    });

    return schema.validate(data, { abortEarly: false });
};
module.exports = {validateProductData}
