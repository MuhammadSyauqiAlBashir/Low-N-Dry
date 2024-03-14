'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Item extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Item.belongsTo(models.Product)
      Item.belongsTo(models.Order)
    }
  }
  Item.init({
    ProductId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate : {
        notEmpty : {
          msg : "Product Id is required"
        },
        notNull : {
          msg : "Product Id is required"
        }, 
      }
    },
    OrderId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate : {
        notEmpty : {
          msg : "Order Id is required"
        },
        notNull : {
          msg : "Order Id is required"
        }, 
      }
    },
    totalPieces: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate : {
        notEmpty : {
          msg : "Total Pieces is required"
        },
        notNull : {
          msg : "Total Pieces is required"
        }, 
      }
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate : {
        notEmpty : {
          msg : "Price is required"
        },
        notNull : {
          msg : "Price is required"
        }, 
      }
    },
  }, {
    sequelize,
    modelName: 'Item',
  });
  return Item;
};