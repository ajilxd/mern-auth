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
  // console.log(req.body);
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

export const google = async (req, res, next) => {
  console.log(req.body);
  try {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      console.log("ajil");
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
      const validUser = user.toObject();
      delete validUser.password;
      const maxAge = 24 * 60 * 60 * 1000;

      res
        .cookie("access_token", token, { httpOnly: true, maxAge: maxAge })
        .status(200)
        .json(validUser);
    } else {
      const generatedPassword = Math.random().toString(36).slice(-8);
      const hashedPassword = bcryptjs.hashSync(generatedPassword, 10);
      const newUser = new User({
        username:
          req.body.name.split(" ").join("").toLowerCase() +
          Math.floor(Math.random() * 1000).toString(),
        email: req.body.email,
        password: hashedPassword,
        profilePicture: req.body.photo,
      });
      await newUser.save();
      const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);

      const maxAge = 24 * 60 * 60 * 1000;
      const newUserObj = newUser.toObject();
      delete newUserObj.password;

      res
        .cookie("access_token", token, { httpOnly: true, maxAge: maxAge })
        .status(200)
        .json(newUserObj);
    }
  } catch (error) {
    next(error);
  }
};

export const signout = function (req, res) {
  res
    .clearCookie("access_token")
    .status(200)
    .json({ message: "signout success" });
};
