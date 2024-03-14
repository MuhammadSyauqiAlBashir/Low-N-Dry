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
      // Order.belongsToMany(models.Product, {through: models.Item, foreignKey: "ProductId"})
      Order.hasMany(models.Notification)
      Order.hasMany(models.Item)

    }
  }
  Order.init({
    UserId: {
      type : DataTypes.INTEGER,
      allowNull : false,
      validate : {
        notEmpty : {
          msg : "User is required"
        },
        notNull : {
          msg : "User is required"
        }, 
      }
    },
    typeOfService: {
      type : DataTypes.STRING,
      allowNull : false,
      validate : {
        notEmpty : {
          msg : "Type of Service is required"
        },
        notNull : {
          msg : "Type of Service is required"
        }, 
      }
    },
    status: {
      type : DataTypes.STRING,
      allowNull : false,
      defaultValue : "Created",
      validate : {
        notEmpty : {
          msg : "Status is required"
        },
        notNull : {
          msg : "Status is required"
        }, 
      }
    },
  }, {
    sequelize,
    modelName: 'Order',
  });
  return Order;
};