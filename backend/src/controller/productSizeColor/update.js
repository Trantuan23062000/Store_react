import { updateData } from "../../services/productSizeColor/update";

const updateProductDataController = async (req, res, next) => {
  try {
    const { detailId } = req.params;
    const newData = req.body;

    // Kiểm tra xem mỗi trường được gửi lên có tồn tại và có giá trị không rỗng không
    if (!newData.color || newData.color.trim() === "") {
      return res.status(201).json({EC:1, error: "Color is required and cannot be empty." });
    }

    if (!newData.codeColor || newData.codeColor.trim() === "") {
      return res.status(201).json({ EC:1,error: "Code color is required and cannot be empty." });
    }

    if (!newData.size || newData.size.trim() === "") {
      return res.status(201).json({ EC:1,error: "Size is required and cannot be empty." });
    }

    if (!newData.description || newData.description.trim() === "") {
      return res.status(201).json({EC:1, error: "Description is required and cannot be empty." });
    }

    // Kiểm tra định dạng của mã màu
    if (!/^#[0-9A-Fa-f]{6}$/i.test(newData.codeColor)) {
      return res.status(201).json({EC:1, error: "Invalid code color format." });
    }

    // Nếu dữ liệu hợp lệ, tiến hành cập nhật
    try {
      const updatedProductVariant = await updateData(detailId, newData);
      res.status(200).json({EC:0,message:"Update product details success !",updatedProductVariant});
    } catch (error) {
      next(error);
    }
  } catch (error) {
    next(error);
  }
};

module.exports = { updateProductDataController };
