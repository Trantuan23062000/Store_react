import { updateData } from "../../services/productSizeColor/update";

const updateProductDataController = async (req, res) => {
  try {
    const { detailId } = req.params;
    const newData = req.body;

    // Kiểm tra xem mỗi trường được gửi lên có tồn tại và có giá trị không rỗng không
    const requiredFields = ["color", "codeColor", "size", "description"];
    for (const field of requiredFields) {
      if (!newData[field] || newData[field].trim() === "") {
        return res.status(400).json({ EC: 1, error: `${field} is required and cannot be empty.` });
      }
    }
    // Kiểm tra định dạng của mã màu
    if (!/^#[0-9A-Fa-f]{6}$/i.test(newData.codeColor)) {
      return res.status(400).json({ EC: 1, error: "Invalid code color format." });
    }

    // Validate detailId
    if (!detailId || isNaN(parseInt(detailId))) {
      return res.status(400).json({ EC: 1, error: "Invalid detailId." });
    }

    // Nếu dữ liệu hợp lệ, tiến hành cập nhật
    try {
      const updatedProductVariant = await updateData(detailId, newData);
      res.status(200).json({ EC: 0, message: "Update product details success !", updatedProductVariant });
    } catch (error) {
      console.log(error);
      res.status(500).json({ EC: 1, error: "Failed to update product details." });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ EC: 1, error: "Internal server error." });
  }
};

module.exports = { updateProductDataController };
