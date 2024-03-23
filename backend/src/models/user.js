'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.belongsToMany(models.Permissions,{through: 'UserPermissions'})
      User.hasMany(models.Orders)
    }
  }
  User.init({
    username: DataTypes.STRING,
    phone: DataTypes.INTEGER,
    email: DataTypes.STRING,
    adress: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Users',
  });
  return User;
};