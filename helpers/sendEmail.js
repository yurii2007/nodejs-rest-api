const nodemailer = require("nodemailer");
require("dotenv").config();

const { MAIL_PASSWORD } = process.env;

const transporter = nodemailer.createTransport({
  host: "smtp.meta.ua",
  port: 465,
  secure: true,
  auth: {
    user: "yurash862@meta.ua",
    pass: MAIL_PASSWORD,
  },
});

const sendMail = async (data) => {
  const email = { ...data, from: "yurash862@meta.ua" };
  console.log(email);
  const info = await transporter.sendMail(email);
  return info;
};

module.exports = sendMail