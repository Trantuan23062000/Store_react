import db from '../../models/index'
const createProductWithImages = async (name, description,price,quantity,category,brandId,imageUrl) => {
  try {
    // Tạo mới sản phẩm
    const product = await db.Products.create({
        name,
        description,
        price,
        quantity,
        category,
        brandId
    });

    // Tạo mới bản ghi ProductImage và liên kết với sản phẩm
    const image = await db.Images.create({ URL: imageUrl });
    console.log(product,image);
    const productImage = await db.ProductImage.create({
        productId: product.id,
        imageId: image.id
    });

    return { product, productImage };
} catch (error) {
    throw error;
}
};

module.exports = {
  createProductWithImages
};
