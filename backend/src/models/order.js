'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Order.belongsTo(models.Users)
      Order.belongsToMany(models.Products,{through:'OrderDetails'})
    }
  }
  Order.init({
    name: DataTypes.STRING,
    order_date: DataTypes.DATE,
    UserId: DataTypes.UUID
  }, {
    sequelize,
    modelName: 'Orders',
  });
  return Order;
};