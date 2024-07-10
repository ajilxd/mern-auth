import User from "../models/userModel.js";
import jwt from "jsonwebtoken";
import bcryptjs from "bcrypt";
async function adminLogin(req, res) {
  const { email, password } = req.body;
  const validAdmin = await User.findOne({ email });
  if (
    validAdmin &&
    validAdmin.isAdmin === true &&
    validAdmin.password == password
  ) {
    console.log("ajil");
    const token = jwt.sign(
      { id: validAdmin._id, role: "admin" },
      process.env.JWT_SECRET
    );
    const maxAge = 24 * 60 * 60 * 1000;
    res
      .cookie("admin_access_token", token, { httpOnly: true, maxAge: maxAge })
      .status(200)
      .json(true);
  } else {
    console.log("invalid admin");
    res.status(500).json("internal server error");
  }
}

async function usersFinder(req, res) {
  console.log("in the user finder function");
  try {
    const data = await User.find().sort({ id: -1 });
    // console.log(data);
    res.status(200).json(data);
  } catch (error) {
    console.log(error);
  }
}

async function editUser(req, res) {
  console.log("hiiiii iam edit");
  const id = req.params.id;
  if (id) {
    const userData = await User.findOne({ _id: id });
    // console.log(userData);
    res.status(200).json(userData);
  }
}

async function updateUser(req, res) {
  try {
    let { email, password, username, id } = req.body;
    const dbUser = await User.findOne({ _id: id });
    console.log("update user", dbUser);
    if (password) {
      password = await bcryptjs.hash(password, 10);
    } else {
      password = dbUser.password;
    }
    const updatedUser = await User.findByIdAndUpdate(
      id,
      {
        $set: {
          username: username,
          email: email,
          password: password || dbUser.password,
        },
      },
      {
        new: true,
      }
    );
    res.status(200).json("User updated succesfully");
  } catch (error) {
    console.log(error.message);
    res.status(500).json("internal server error");
  }
}

async function deleteUser(req, res) {
  try {
    await User.deleteOne({ _id: req.params.id });
    res.status(200).json("user deleted succesfully");
  } catch (error) {
    console.log(error.message);
    res.status(500).json("internal servor error");
  }
}

export { adminLogin, usersFinder, editUser, updateUser, deleteUser };
