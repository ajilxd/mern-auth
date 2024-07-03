import User from "../models/userModel.js";
import jwt from "jsonwebtoken";
async function adminLogin(req, res) {
  const { email, password } = req.body;
  const validAdmin = await User.findOne({ email });
  if (
    validAdmin &&
    validAdmin.isAdmin === true &&
    validAdmin.password == password
  ) {
    console.log("ajil");
    const token = jwt.sign({ id: validAdmin._id }, process.env.JWT_SECRET);
    const maxAge = 24 * 60 * 60 * 1000;
    res
      .cookie("admin_access_token", token, { httpOnly: true, maxAge: maxAge })
      .status(200)
      .json("welcome admin");
  } else {
    console.log("invalid admin");
  }
}

export { adminLogin };
