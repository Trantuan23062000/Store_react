import { createOrder } from "../../services/order/order"; // Đảm bảo rằng đường dẫn đúng

const Orders = async (req, res) => {
  try {
    const { orderData, orderDetailData } = req.body; // Lấy dữ liệu đơn hàng và chi tiết đơn hàng từ body của request
    const result = await createOrder(orderData, orderDetailData); // Gọi hàm createOrder để tạo đơn hàng
    res.status(201).json({result,EC:0}); // Trả về kết quả thành công với mã trạng thái 201 (Created)
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" }); // Trả về lỗi nếu có bất kỳ lỗi nào xảy ra
  }
};

module.exports = {Orders};