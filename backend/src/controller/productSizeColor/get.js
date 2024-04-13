import { getProductDetails } from "../../services/productSizeColor/get";

const getProductDetailsController = async (req, res, next) => {
  try {

    // Gọi service function để lấy thông tin sản phẩm
    const details = await getProductDetails();
    // Nếu không tìm thấy sản phẩm
    if (!details) {
      return res.status(404).json({ EC:0,success: false, message: "Product not found" });
    }
    // Trả về thông tin sản phẩm thành công
    res.status(200).json({ EC:0,success: true, details });
  } catch (error) {
    // Xử lý lỗi
    console.error("Error getting product details:", error);
    next(error);
  }
};

module.exports = { getProductDetailsController };
