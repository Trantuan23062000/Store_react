import db from "../../models/index";

const getImages = async (page, pageSize) => {
  try {
    const offset = (page - 1) * pageSize;
    const totalImages = await db.Images.count();
    const images = await db.Images.findAll({
      limit: pageSize,
      offset,
      attributes: ["id", "URL"],
      order: [["URL", "DESC"]],
    });
    return { images, totalImages };
  } catch (error) {
    console.error("Error fetching images:", error);
    throw error;
  }
};
module.exports = { getImages };
