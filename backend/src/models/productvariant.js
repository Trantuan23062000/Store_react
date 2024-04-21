'use strict';
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class productVariant extends Model {
    static associate(models) {
      productVariant.belongsToMany(models.Products, {
        through: "Detail",
        foreignKey: "productVariantId",
      });
    }
  }
  productVariant.init(
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      color: DataTypes.STRING,
      codeColor: DataTypes.STRING,
      size: DataTypes.STRING,
      description: DataTypes.STRING,
      quantity: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "productVariant",
    }
  );
  return productVariant;
};