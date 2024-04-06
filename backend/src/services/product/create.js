import db from "../../models/index";
const createProduct = async (
  name,
  description,
  price,
  quantity,
  category,
  brandId,
  imageIds
) => {
  try {
    const product = await db.Products.create({
      name,
      description,
      price,
      quantity,
      category,
      brandId,
    });
    const productImages = await Promise.all(
      imageIds.map(async (imageId) => {
        const productImage = await db.ProductImage.create({
          productId: product.id,
          imageId,
        });
        return productImage;
      })
    );
    return { product, productImages };
  } catch (error) {
    throw error;
  }
};

module.exports = { createProduct };
