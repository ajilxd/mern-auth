import User from "../models/userModel.js";

export const signup = async (req, res) => {
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
    console.log(error.message);
    res.status(500).json({ message: "Failed to create user" });
  }
};
