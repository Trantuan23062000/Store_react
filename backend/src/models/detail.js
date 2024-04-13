'use strict';
const {
  Model
} = require('sequelize');
const Product = require("../models/product")
const productVariant = require("../models/productvariant")
module.exports = (sequelize, DataTypes) => {
  class Detail extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Detail.belongsTo(models.Products);
      Detail.belongsTo(models.productVariant);
    }
  }
  Detail.init({
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4 
    },
    productId: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      references: {
        model: Product, 
        key: 'id',
      },
      onDelete: 'CASCADE',
    },
    productVariantId: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      references: {
        model: productVariant,
        key: 'id',
      },
      onDelete: 'CASCADE',
    },
  }, {
    sequelize,
    modelName: 'Detail',
  });
  return Detail;
};