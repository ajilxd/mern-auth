import User from "../models/userModel.js";
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";
import bcryptjs from "bcrypt";

export const signup = async (req, res, next) => {
  const { username, email, password } = req.body;
  const newUser = new User({
    username,
    email,
    password,
  });
  try {
    await newUser.save();
    res.status(200).json({ message: "User created successfully" });
  } catch (error) {
    next(error);
  }
};

export const signin = async (req, res, next) => {
  const { email, password } = req.body;
  console.log(req.body);
  const validUser = await User.findOne({ email });
  if (!validUser) return next(errorHandler(404, "user not found"));
  console.log(validUser);
  const validPassword = bcryptjs.compareSync(password, validUser.password);
  if (!validPassword) return next(errorHandler(401, "wrong credentials"));
  const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);
  const user = validUser.toObject();
  delete user.password; // Explicitly delete the password field
  const maxAge = 24 * 60 * 60 * 1000; // 1 day in milliseconds

  res
    .cookie("access_token", token, { httpOnly: true, maxAge: maxAge })
    .status(200)
    .json(user);
};
