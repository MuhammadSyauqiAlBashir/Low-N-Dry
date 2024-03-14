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
      // define association here
      Product.hasMany(models.Item)
    }
  }
  Product.init({
    name: DataTypes.STRING,
    picture: {
      type : DataTypes.STRING,
      allowNull : false,
      validate : {
        notEmpty : {
          msg : "Picture is required"
        },
        notNull : {
          msg : "Picture is required"
        }, 
      }
    },
    price: {
      type : DataTypes.STRING,
      allowNull : false,
      validate : {
        notEmpty : {
          msg : "Price is required"
        },
        notNull : {
          msg : "Price is required"
        }, 
        min : {
          args : 1000,
          msg : "Minimum Price is Rp. 1000.00"
        }
      }
    },
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};