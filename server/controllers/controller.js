const bcryptPass = require("../helpers/bcrypt");
const midtransClient = require("midtrans-client");
const { OAuth2Client } = require("google-auth-library");
const client = new OAuth2Client();
var ImageKit = require("imagekit");
let imagekit = new ImageKit({
  publicKey: process.env.PUBLICKEY,
  privateKey: process.env.PRIVATEKEY,
  urlEndpoint: process.env.URLENDPOINT,
});
const Token = require("../helpers/jwt");
const {
  User,
  Province,
  Product,
  Order,
  Item,
  Notification,
} = require("../models");

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
      const accessToken = Token.genToken(payload);
      res.status(201).json({ message: "Success Login", accessToken });
    } catch (error) {
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
      next(error);
    }
  }
  static async initiateMidtrans(req, res, next) {
    try {
      let snap = new midtransClient.Snap({
        isProduction: false,
        serverKey: process.env.SERVERKEY,
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
        for (let i = 0; i < items.length; i++) {
          let item = items[i];
          let dataProduct = await Product.findByPk(item.ProductId);
          item.price = dataProduct.price;
          let peritems = item.totalPieces * item.price;
          totalPrice += peritems;
          await Item.create({
            ProductId: item.ProductId,
            OrderId: order.id,
            totalPieces: item.totalPieces,
            price: item.totalPieces * item.price,
          });
        }
        return totalPrice;
      };
      const resultTotalPrice = await createITems();
      if (typeOfService === "Sensational") {
        resultTotalPrice = resultTotalPrice + (resultTotalPrice * 70) / 100;
      }
      let parameter = {
        transaction_details: {
          order_id:
            process.env.NODE_ENV !== "production"
              ? `${order.id}-dev`
              : `${order.id}-prod`,
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
      res.status(201).json({
        message: "Order Created",
        transactionToken,
        resultTotalPrice,
        order,
      });
    } catch (error) {
      next(error);
    }
  }
  static async donePayment(req, res, next) {
    try {
      let { OrderId } = req.params;
      let order = await Order.findByPk(OrderId);
      if (!order) throw { name: "errorNotFound" };
      if (order.status === "Finished") {
        throw { name: "Finished Order Cant be Change" };
      }
      order.update({
        status: "Processed",
      });
      res.status(200).json({ message: "Order hasbeen updated to processed" });
    } catch (error) {
      next(error);
    }
  }
  static async getListOrder(req, res, next) {
    try {
      let UserId = req.user.id;
      let order = await Order.findAll({
        where: {
          UserId,
        },
        include: [
          {
            model: Item,
            include: Product,
          },
        ],
      });
      res.status(200).json(order);
    } catch (error) {
      next(error);
    }
  }
  static async deleteOrder(req, res, next) {
    try {
      let { OrderId } = req.params;
      let order = await Order.findByPk(OrderId);
      if (!order) throw { name: "errorNotFound" };
      if (order.status !== "Finished") {
        throw { name: "Only finished Order can be deleted" };
      }
      await Item.destroy({
        where: {
          OrderId: OrderId,
        },
      });
      await Notification.destroy({
        where: {
          OrderId: OrderId,
        },
      });
      await order.destroy({
        where: {
          id: OrderId,
        },
      });
      res
        .status(200)
        .json({ message: "Success delete selected Order History" });
    } catch (error) {
      next(error);
    }
  }
  static async listProduct(req, res, next) {
    try {
      let product = await Product.findAll();
      res.status(200).json(product);
    } catch (error) {
      next(error);
      console.log(error);
    }
  }
  static async createNotification(req, res, next) {
    try {
      let UserId = req.user.id;
      let { detail, OrderId } = req.body;
      let notification = await Notification.create({
        detail,
        UserId,
        OrderId,
      });
      res.status(201).json(notification);
    } catch (error) {
      next(error);
    }
  }
  static async getNotification(req, res, next) {
    try {
      let UserId = req.user.id;
      let listNotif = await Notification.findAll({
        where: {
          UserId: UserId,
        },
      });
      res.status(200).json(listNotif);
    } catch (error) {
      next(error);
    }
  }
  static async getProvince(req, res, next) {
    try {
      let province = await Province.findAll();
      res.status(200).json(province);
    } catch (error) {
      next(error);
    }
  }
  static async changeUserPicture(req, res, next) {
    try {
      let id = req.user.id;
      if (!req.file) throw { name: "fileRequired" };
      const base64 = req.file.buffer.toString("base64");
      const url = `data:${req.file.mimetype};base64,${base64}`;
      let imageURL = await imagekit.upload({
        file: url, //required
        fileName: req.file.originalname, //required
        tags: ["tag1", "tag2"],
      });
      let user = await User.findByPk(id);
      await user.update({ profilePicture: imageURL.url });
      res.status(200).json({ message: "Profile picture successfully changed" });
    } catch (error) {
      next(error);
    }
  }

  static async googleLogin(req, res, next) {
    try {
      const { googleToken } = req.body;
      if (!googleToken) throw { name: "InvalidToken" };
      const ticket = await client.verifyIdToken({
        idToken: googleToken,
        audience: process.env.CLIENTID,
      });
      const { email, name } = ticket.getPayload();
      const [user, created] = await User.findOrCreate({
        where: { email },
        defaults: {
          username: name,
          email,
          password: Math.random().toString(),
          address: "DKI Jakarta",
        },
      });
      const payload = { id: user.id };
      const accessToken = Token.genToken(payload);
      res.status(201).json({ message: "Success Login", accessToken });
    } catch (error) {
      next(error);
    }
  }
  static async getProfile(req, res, next) {
    try {
      let UserId = req.user.id;
      let user = await User.findOne({
        where: {
          id: UserId,
        },
        attributes: {
          exclude: ["password"],
        },
      });
      if (!user) throw { name: "errorNotFound" };
      res.status(200).json(user);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = Controller;
