import ProductServiecs from "../../services/product/create"
import Joi from "joi"


const check = Joi.object({
    name:Joi.string().required().messages({
        'any.required' :'Name is required !',
        'string.base' : 'Name is the string !'
    }),
    description:Joi.string().required().messages({
        'any.required' :'Description is required !',
        'string.base' : 'Description is the string !'
    }),
    price:Joi.number().positive().required().messages({
        'any.required' : 'Price is required !',
        'number.base':'Price is number !',
        'number.positive':'Price must be a positive number',
    }),
    quantity:Joi.number().positive().required().messages({
        'any.required' : 'Quantity is required !',
        'number.base':'Quantity is number !',
        'number.positive':'Quantity must be a positive number',
    }),
    category:Joi.string().required().messages({
        'any.required' :'Category is required !',
        'string.base' : 'Category is the string !'
    }),
    brandId:Joi.string().required().messages({
        'any.required' :'Brand is required !',
        'string.base' : 'Brand is the string !'
    }),
    imageUrl: Joi.string().uri().required().messages({
        'any.required': 'imageId is required !',
        'URL.base': 'imageId is Array',
        'string.base': 'imageId is string !',
        'URL.uri':'URL valid !'
      }),
})

const CreateImages = async (req, res, next) => {
    try {
        const { error, value } = check.validate(req.body);

        if (error) {
            return res.status(400).json({
                success: false,
                message: error.details[0].message
            });
        }

        console.log(req.body);

        // Destructure validated data
        const { name, description, price, quantity, category, brandId, imageUrl } = value;

        // Call service to create product with image
        const { product, productImage } = await ProductServiecs.createProductWithImages(
            name,
            description,
            price,
            quantity,
            category,
            brandId,
            imageUrl
        );

        res.status(201).json({
            success: true,
            data: {
                product,
                productImage
            },
            message: 'Product and image added successfully.'
        });
    } catch (error) {
        next(error);
    }
};


module.exports = {
    CreateImages
}