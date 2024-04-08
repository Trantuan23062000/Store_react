import db from "../../models/index";
const createProduct = async (
  name,
  description,
  price,
  quantity,
  category,
  brandId,
  imageId
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

    // Thêm ID sản phẩm và ID hình ảnh vào bảng ProductImage
    const productImage = await db.ProductImage.create({
      productId: product.id,
      imageId,
    });

    return { 
      product, productImage};
  } catch (error) {
    throw error;
  }
};

module.exports = { createProduct };
