import db from "../../models";
import cloudinary from "../../middleware/upload";

const updateProductAndImage = async (productId, newData, files) => {
  try {
    // Lấy thông tin sản phẩm từ cơ sở dữ liệu
    const product = await db.Products.findByPk(productId);

    // Kiểm tra xem sản phẩm có tồn tại không
    if (!product) {
      throw new Error("Product not found");
    }

    // Cập nhật thông tin sản phẩm với dữ liệu mới
    await product.update(newData);

    // Lấy thông tin hình ảnh từ cơ sở dữ liệu dựa trên ImageId của sản phẩm
    const image = await db.Images.findByPk(product.ImageId);

    // Kiểm tra xem hình ảnh có tồn tại không
    if (!image) {
      throw new Error("Image not found");
    }

    // Kiểm tra xem trường URL có phải là một chuỗi JSON không
    let imageURLs = [];
    if (image.URL) {
      imageURLs = JSON.parse(image.URL);
    }

    // Xóa các ảnh cũ khỏi Cloudinary
    await Promise.all(
      imageURLs.map(async (url) => {
        try {
          // Lấy public ID từ URL ảnh
          const publicId = url.split("/").slice(-1)[0].split(".")[0];

          // Xoá ảnh từ Cloudinary
          await cloudinary.uploader.destroy(publicId);

          console.log(
            "Deleted image from Cloudinary with public ID:",
            publicId
          );
        } catch (error) {
          console.error("Error deleting image from Cloudinary:", error);
        }
      })
    );

    // Upload các ảnh mới lên Cloudinary và cập nhật URL ảnh trong cơ sở dữ liệu
    const newImageURLs = [];
    for (const file of files) {
      const result = await cloudinary.uploader.upload(file.path);
      const imageURL = result.secure_url;
      newImageURLs.push(imageURL);
    }
    await image.update({ URL: JSON.stringify(newImageURLs) });

    return { product, image };
  } catch (error) {
    console.log(error);
    console.error("Error updating product and image:", error);
    throw new Error(error);
  }
};

module.exports = { updateProductAndImage };
