import { updateProduct } from "../../services/product/editProduct"

const updateProductController = async (req, res) => {
  try {
    const productId = req.params.id;
    const newData = req.body; // Dữ liệu mới của sản phẩm từ client

    // Gọi hàm cập nhật sản phẩm từ services
    const updatedProduct = await updateProduct(productId, newData);

    // Trả về thông tin sản phẩm đã được cập nhật
    res.json(updatedProduct);
  } catch (error) {
    console.log(error);
    // Trả về thông báo lỗi nếu có lỗi xảy ra
    res.status(400).json({ error: error.message });
  }
};

module.exports = { updateProductController };
