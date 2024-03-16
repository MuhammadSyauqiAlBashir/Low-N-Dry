if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
const express = require("express");
const router = require("./routers");
const app = express();
var cron = require("node-cron");

const cors = require("cors");
const { User, Order, Notification } = require("./models");
const nodemailer = require("nodemailer");

cron.schedule("0-59 0-23 1-31 1-12 0-6", async () => {
  let listOrder = await Order.findAll();
  listOrder.map(async (el) => {
    const currentTime = Date.now();
    const updatedTime = new Date(el.updatedAt);
    const diff = currentTime - updatedTime;
    const minutes = Math.floor((diff / 1000 / 60) << 0);
    if (el.status === "Processed" && minutes >= 1) {
      await el.update({
        status: "Finished",
      });
      let notification = await Notification.create({
        detail: `Pesanan anda dengan OrderId ${el.id} telah di proses dengan baik, silahkan hubungin admin untuk proses penjemputan.`,
        UserId: el.UserId,
        OrderId: el.id,
      });
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: "bashirsuki@gmail.com",
          pass: "onhr ldcr llop setd",
        },
      });
      let user = await User.findByPk(el.UserId);
      await transporter.sendMail({
        from: "bashirsuki@gmail.com",
        // to: `${user.email}`,
        to: user.email,
        subject: "Laundry Has been finished",
        text: `Pesanan anda dengan OrderId ${el.id} telah di proses dengan baik, silahkan hubungin admin untuk proses penjemputan.`,
      });
    }
  });
});

app.use(cors());

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(router);

module.exports = app;
