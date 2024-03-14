const bcryptPass = require("../helpers/bcrypt");
const Token = require("../helpers/jwt");
const {
  User,
  Province,
  Product,
  Order,
  Item,
  Notification,
} = require("../models");
const { Op } = require("sequelize");

class Controller {
  static async login(req, res, next) {
    try {
      const { email, password } = req.body;
      if (!email) throw { name: "EmailRequired" };
      if (!password) throw { name: "PasswordRequired" };
      const user = await User.findOne({
        where: {
          email: email,
        },
      });
      if (!user) throw { name: "InvalidLogin" };
      const checkPass = bcryptPass.comparePassword(password, user.password);
      if (!checkPass) throw { name: "InvalidLogin" };
      const payload = { id: user.id };
      const newToken = Token.genToken(payload);
      res.status(200).json({ message: "Success Login", newToken });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
  static async register(req, res, next) {
    try {
        const user = await User.create(req.body);
        user.set({
          password: "",
        });
        res.status(201).json(user);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
}

module.exports = Controller;
