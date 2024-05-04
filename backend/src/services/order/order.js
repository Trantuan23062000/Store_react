import db from "../../models/index";

const createOrder = async (orderData, orderDetailData) => {
  let transaction;
  try {
    transaction = await db.sequelize.transaction();

    // Thêm đơn hàng vào bảng Orders
    const newOrder = await db.Orders.create(orderData, { transaction });
    const orderId = newOrder.id;

    // Chuyển đổi dữ liệu detail từ mảng sang chuỗi
    const detailString = orderDetailData.detail.join(',');

    // Thêm đơn hàng chi tiết vào bảng OrderDetails với orderId đã tạo
    const newOrderDetail = await db.OrderDetails.create(
      { ...orderDetailData, orderId, detail: detailString },
      { transaction }
    );

    // Lấy id từ trường detail và tham chiếu đến bảng Details
    const detailIds = orderDetailData.detail;
    const productVariantIds = await getProductVariantIds(detailIds, transaction);

    // Cập nhật số lượng sản phẩm trong bảng ProductVariant
    await updateProductVariantQuantity(productVariantIds, orderDetailData.quantity, transaction);

    await transaction.commit();
    return { newOrder, newOrderDetail };
  } catch (error) {
    if (transaction) await transaction.rollback();
    console.log(error);
    throw new Error("Failed to create order and order details");
  }
};

const getProductVariantIds = async (detailIds, transaction) => {
  const productVariantIds = [];
  // Duyệt qua các id trong mảng detailIds để lấy id của sản phẩm từ bảng Detail
  for (const detailId of detailIds) {
    const detail = await db.Detail.findByPk(detailId, { transaction });
    if (detail) {
      // Thêm id của sản phẩm vào mảng productVariantIds
      productVariantIds.push(detail.productVariantId);
    }
  }
  return productVariantIds;
};

const updateProductVariantQuantity = async (productVariantIds, quantity, transaction) => {
  // Duyệt qua danh sách id của sản phẩm để cập nhật số lượng trong bảng ProductVariant
  for (const productVariantId of productVariantIds) {
    const productVariant = await db.productVariant.findByPk(productVariantId, { transaction });
    if (productVariant) {
      // Cập nhật số lượng sản phẩm trong bảng ProductVariant
      productVariant.quantity -= quantity;
      await productVariant.save({ transaction });
    }
  }
};

module.exports = { createOrder };