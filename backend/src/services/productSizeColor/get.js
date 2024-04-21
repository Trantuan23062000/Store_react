import db from "../../models";

const getProductDetails = async (pageNumber, pageSize) => {
  try {
    // Đếm tổng số sản phẩm
    const totalProducts = await db.Detail.count();

    // Tính tổng số trang
    const totalPages = Math.ceil(totalProducts / pageSize);

    // Tính vị trí bắt đầu
    const offset = (pageNumber - 1) * pageSize;

    // Lấy danh sách sản phẩm cho trang hiện tại
    const productDetails = await db.Detail.findAll({
      include: [
        {
          model: db.Products,
        },
        {
          model: db.productVariant,
        },
      ],
      limit: pageSize,
      offset: offset,
    });

    return { productDetails, totalPages };
  } catch (error) {
    throw error;
  }
};


module.exports = { getProductDetails };
