import Joi from "joi";
import { updateProductAndImage } from "../../services/product/UpdateProductImage";

// Schema for request body validation
const productSchema = Joi.object({
  name: Joi.string().required(),
  description: Joi.string().required(),
  price: Joi.number().positive().required(),
  quantity: Joi.number().positive().required(),
  category: Joi.string().required(),
  brandId: Joi.string().required(),
  imageId: Joi.string().required()
});

const updateProducts = async (req, res) => {
  try {
    // Validate request body against schema
    const { error, value } = productSchema.validate(req.body);

    // If there is an error, send a 400 response with error message
    if (error) {
      return res.status(201).json({ error: error.details[0].message });
    }

    const productId = req.params.id;
    const newData = value; // Dữ liệu mới của sản phẩm từ client
    const files = req.files; // Các file hình ảnh từ client

    // Gọi hàm cập nhật sản phẩm và hình ảnh từ services
    const { product, image } = await updateProductAndImage(productId, newData, files);

    // Trả về thông tin sản phẩm và hình ảnh đã được cập nhật
    res.status(200).json({ EC:0 , message:"Update success !" ,product, image });
  } catch (error) {
    console.log(error);
    // Trả về thông báo lỗi nếu có lỗi xảy ra
    res.status(400).json({ error: error.message });
  }
};

module.exports = { updateProducts };
