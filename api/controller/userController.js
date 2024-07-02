// update user details
import User from "../models/userModel.js";
import { errorHandler } from "../utils/error.js";

export const updateUser = async (req, res, next) => {
  console.log(
    "hgggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggg"
  );
  if (req.user.id !== req.params.id) {
    return next(errorHandler(401, "you can update only your account"));
  }

  try {
    if (req.body.password) {
      req.body.password = bcrypt.hashSync(req.body.password, 10);
    }
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          username: req.body.username,
          email: req.body.email,
          password: req.body.password,
          profilePicture: req.body.profilePicture,
        },
      },
      {
        new: true,
      }
    );
    const { password, ...rest } = updatedUser._doc;
    res.status(200).json(rest);
  } catch (error) {
    console.log(error.message);
  }
};

export const deleteUser = async (req, res) => {
  console.log("jojhfkjiosdj");
  if (req.user.id !== req.params.id) {
    console.log("gdfgffd");
    return next(errorHandler(401, "access denied"));
  }
  try {
    await User.findByIdAndDelete(req.params.id);
    console.log("huuu");
    res.status(200).json("User has been deleted");
  } catch (error) {
    console.log("gdsfgsfd");
    next(error);
  }
};
