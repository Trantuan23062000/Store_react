'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Image extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Image.hasMany(models.ProductImage, { foreignKey: 'imageId' });
      Image.belongsToMany(models.Products, { through: 'ProductImage' });
    }
  }
  Image.init({
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4 
    },
    URL: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Images',
  });
  return Image;
};