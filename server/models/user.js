"use strict";
const { Model } = require("sequelize");
const bcryptPass = require('../helpers/bcrypt');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init(
    {
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: {
          args: true,
          msg: "Email must be unique",
        },
        validate: {
          notEmpty: {
            msg: "Email is required",
          },
          notNull: {
            msg: "Email is required",
          },
          isEmail: {
            msg: "Only email format is allowed",
          },
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Password is required",
          },
          notNull: {
            msg: "Password is required",
          },
          len: {
            args: [5, 100],
            msg: "Minimum Password 5 Characters",
          },
        },
      },
      address: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Adress is required",
          },
          notNull: {
            msg: "Adress is required",
          },
          equals: {
            args: "DKI Jakarta",
            msg: "We are sorry, your area is not covered yet.",
          },
        },
      },
    },
    {
      hooks: {
        beforeCreate: (User, options) => {
          User.password = bcryptPass.hashPassword(User.password);
        },
      },
      sequelize,
      modelName: "User",
    }
  );
  return User;
};
