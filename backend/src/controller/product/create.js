import {uploadImage} from "../../services/product/upload"
import {createProduct} from "../../services/product/create"

const addProduct = async (req, res, next) => {
    try {
      const { name, description, price, quantity, category, brandId } = req.body;
      const files = req.files;
      
      if (!files || files.length === 0) {
        return res.status(400).json({ error: 'Please upload at least one image.' });
      }
      
      const imageIds = [];
      for (const file of files) {
        const imageId = await uploadImage(file);
        imageIds.push(imageId);
      }
      
      const { product, productImages } = await createProduct(name, description, price, quantity, category, brandId, imageIds);
      
      res.status(201).json({
        success: true,
        data: {
          product,
          productImages
        },
        message: 'Product added successfully.'
      });
    } catch (error) {
      next(error);
    }
  };
  
  module.exports = { addProduct };