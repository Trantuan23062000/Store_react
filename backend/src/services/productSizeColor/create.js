import db from "../../models/index";

const addProductData = async (productId, productvariants) => {
    const transaction = await db.sequelize.transaction();
    try {
        // Thêm mới dữ liệu vào bảng Size và lấy id của các bản ghi tương ứng
        const createProductVariant = await db.productVariant.bulkCreate(productvariants, { transaction });
        const variantsIds = createProductVariant.map(productVariant => productVariant.id);

        await db.Detail.bulkCreate(variantsIds.map(productVariantId => ({ productId, productVariantId })), { transaction });
  
        // Commit transaction
        await transaction.commit();
  
        return {
            success: true,
            message: "Product data added successfully."
        };
    } catch (error) {
        // Rollback transaction nếu có lỗi
        await transaction.rollback();
        throw error;
    }
};

module.exports = {
  addProductData,
};
