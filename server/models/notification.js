'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Notification extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Notification.belongsTo(models.User)
      Notification.belongsTo(models.Order)
    }
  }
  Notification.init({
    detail: {
      type: DataTypes.STRING,
      allowNull: false,
      validate : {
        notEmpty : {
          msg : "Detail Notification is required"
        },
        notNull : {
          msg : "Detail Notification is required"
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
    UserId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate : {
        notEmpty : {
          msg : "User Id is required"
        },
        notNull : {
          msg : "User Id is required"
        }, 
      }
    },
  }, {
    sequelize,
    modelName: 'Notification',
  });
  return Notification;
};