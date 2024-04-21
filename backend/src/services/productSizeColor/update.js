import db from "../../models/index";
const updateData = async (detailId, newData) => {
  try {
    // Bước 1: Tìm detailId trong bảng Detail
    const detail = await db.Detail.findByPk(detailId);

    if (!detail) {
      throw new Error('Detail not found');
    }

    // Bước 2: Lấy productVariantId từ detail
    const productVariantId = detail.productVariantId;

    // Bước 3: Tìm bản ghi trong bảng productVariant dựa trên productVariantId
    const productVariant = await db.productVariant.findByPk(productVariantId);

    if (!productVariant) {
      throw new Error('Product variant not found');
    }

    // Bước 4: Cập nhật thông tin mới cho bản ghi productVariant
    await productVariant.update(newData);

    return productVariant;
  } catch (error) {
    throw error;
  }
};
module.exports = {
  updateData,
};
