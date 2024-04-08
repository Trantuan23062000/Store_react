import { updateImage } from "../../services/product/editImage";

const updateProduct = async (req, res) => {
  try {
    const imageId = req.params.id;
    const imageData = req.files.map(file => file.path); // Dữ liệu ảnh mới từ client

    const updatedImage = await updateImage(imageId, imageData, req.files);
    res.json(updatedImage);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error.message });
  }
};

module.exports = { updateProduct };
