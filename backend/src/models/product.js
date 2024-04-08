'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Product.hasMany(models.ProductImage, { foreignKey: 'productId' });
      // define association here
      Product.belongsTo(models.Brands)
      //Product.hasMany(models.Images)
      Product.belongsToMany(models.Images, { through: 'ProductImage' });
      Product.hasMany(models.Colors)
      Product.hasMany(models.Sizes)
      //Product.hasMany(models.OrderDetails)
      Product.belongsToMany(models.Orders,{through:'OrderDetails'})
    }
  }
  Product.init({
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4 
    },
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    price: DataTypes.FLOAT,
    quantity: DataTypes.INTEGER,
    category:DataTypes.STRING,
    brandId: DataTypes.UUID

  }, {
    sequelize,
    modelName: 'Products',
  });
  return Product;
};