import express from "express";
import bcrypt from "bcryptjs";
import { User } from "../models/authasm.js";
// import { CheckRegisterValidate } from '../middleware/auth.js';
import jwt from "jsonwebtoken";
const Authrouter = express.Router();
Authrouter.post("/auth/register", async (req, res) => {
  const body = req.body;
  body.password = await bcrypt.hash(body.password, 10);
  const Users = new User(body);
  const response = await Users.save();
  res.send(response);
});
Authrouter.post("/auth/login", async (req, res) => {
  const body = req.body;
  const user = await User.findOne({ email: body.email });
  if (user === null) {
    res.send({ status: false, message: "Người dùng không tồn tại" });
  } else {
    const password = user.password;
    const verify = await bcrypt.compare(body.password, password);
    if (verify) {
      const token = jwt.sign({ uid: user._id }, "123456");
      res.send({
        status: true,
        message: "Đăng nhập thành công",
        user: user,
        token: token,
      });
    } else {
      res.send({ status: false, message: "Sai mật khẩu" });
    }
  }
});
export default Authrouter;
