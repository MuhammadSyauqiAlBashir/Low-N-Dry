const bcryptPass = require("../helpers/bcrypt");
const midtransClient = require("midtrans-client");
const { OAuth2Client } = require("google-auth-library");
const client = new OAuth2Client();
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
  static async initiateMidtrans(req, res, next) {
    try {
      let snap = new midtransClient.Snap({
        // Set to true if you want Production Environment (accept real transaction).
        isProduction: false,
        serverKey: "SB-Mid-server-1uBSXyKIGgK0ECeZfbLFJDHH",
      });
      let UserId = req.user.id;
      let { typeOfService } = req.body;
      const order = await Order.create({
        UserId,
        typeOfService,
      });
      let { items } = req.body;
      
      const createITems = async () => {
        let totalPrice = 0;
        for (let i = 0 ;  i<items.length; i ++ ){
          let item =  items[i]
          let dataProduct = await Product.findByPk(item.ProductId);
          item.price = dataProduct.price;
          let peritems = item.totalPieces * item.price;
          totalPrice += peritems;
          await Item.create({
            ProductId: item.ProductId,
            OrderId: order.id,
            totalPieces: item.totalPieces,
            price: item.totalPieces * item.price,
          })
        }
        return totalPrice
      };
      const resultTotalPrice = await createITems()
      let parameter = {
        transaction_details: {
          order_id: `${order.id}-dev`,
          gross_amount: resultTotalPrice,
        },
        credit_card: {
          secure: true,
        },
        customer_details: {
          email: req.user.email,
          phone: req.user.address,
        },
      };

      const transaction = await snap.createTransaction(parameter);
      let transactionToken = transaction.token;
      res.json({ message: "Order Created", transactionToken });
    } catch (error) {
      console.log(error);
    }
  }
  // static async googleLogin(req, res, next) {
  //   const { googleToken } = req.body;
  //   try {
  //     const ticket = await client.verifyIdToken({
  //       idToken: googleToken,
  //       audience:
  //         "591988567538-r3lr3o6g8d99398uj0mbd4bm4r3tqo9r.apps.googleusercontent.com",
  //     });
  //     const { email, name } = ticket.getPayload();
  //     const [user, created] = await User.findOrCreate({
  //       where: { email },
  //       defaults: {
  //         username: name,
  //         email,
  //         password: Math.random().toString(),
  //       },
  //     });
  //     const payload = { id: user.id };
  //     const token = signToken(payload);
  //     res.status(200).json({ message: `Success Logged in as ${email}`, token });
  //   } catch (error) {
  //     console.log(error);
  //     next(error);
    // }
  // }
}

module.exports = Controller;
