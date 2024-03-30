import GetList from "../../services/images/getlist"
const listImages = async (req, res) => {
    try {
      const page = req.query.page || 1;
      const pageSize = req.query.pageSize || 10;
      const images = await GetList.getImages(+page, +pageSize);
      return res.status(200).json({
        success: "Get image success !",
        images,
        EC: 0,
        DT: images.totalImages,
      });
    } catch (error) {
      console.error("Error listing images:", error);
      return res.status(500).json({ error: "Failed to list images" });
    }
  };

module.exports = {
    listImages
}