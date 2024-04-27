import db from "../../models/index";

const addProductData = async (productId, productvariants) => {
    const transaction = await db.sequelize.transaction();
    try {
        const colorIdMap = {};
        const sizeIdMap = {};

        // Thêm mới hoặc tìm các color
        for (const variant of productvariants) {
            let [colorObj, createdColor] = await db.Colors.findOrCreate({
                where: { color: variant.color, codeColor: variant.codeColor },
                transaction: transaction
            });
            colorIdMap[variant.color] = colorObj.id;
        }
        // Thêm mới hoặc tìm các size
        for (const variant of productvariants) {
            let [sizeObj, createdSize] = await db.Sizes.findOrCreate({
                where: { size: variant.size, description: variant.description },
                transaction: transaction
            });
            sizeIdMap[variant.size] = sizeObj.id;
        }

        // Thêm mới các product variants
        const productVariantData = productvariants.map(variant => ({
            colorId: colorIdMap[variant.color],
            sizeId: sizeIdMap[variant.size],
            quantity: variant.quantity
            // Các trường dữ liệu khác của product variant
        }));
        const createProductVariant = await db.productVariant.bulkCreate(productVariantData, { transaction });
        const productVariantIds = createProductVariant.map(productVariant => productVariant.id);

        // Thêm dữ liệu vào bảng Details
        const detailsData = productVariantIds.map(productVariantId => ({ productId, productVariantId }));
        await db.Detail.bulkCreate(detailsData, { transaction });
  
        // Commit transaction
        await transaction.commit();
  
        return {
            success: true,
            message: "Product data added successfully."
        };
    } catch (error) {
        // Rollback transaction nếu có lỗi xảy ra
        await transaction.rollback();
        console.log(error);
        return {
            success: false,
            message: "Failed to add product data."
        };
    }
};

module.exports = {
  addProductData,
};
