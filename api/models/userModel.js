import mongoose from "mongoose";
import bcryptjs from "bcrypt";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

userSchema.pre("save", function (next) {
  this.password = bcryptjs.hashSync(this.password, 10);
  next();
});

const User = mongoose.model("User", userSchema);
export default User;
