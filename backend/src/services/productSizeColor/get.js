import db from "../../models";

const getProductDetails = async () => {
  try {
    const productDetails = await db.Detail.findAll({
      include: [
        {
          model: db.Products,
        },
        {
          model: db.productVariant,
        },
      ],
    });

    return productDetails;
  } catch (error) {
    throw error;
  }
};

module.exports = { getProductDetails };
