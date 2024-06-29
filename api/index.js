import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoutes from "./router/userRoute.js";
import authRoutes from "./router/authRoute.js";

dotenv.config();

mongoose
  .connect(process.env.MONGO)
  .then(() => console.log(`Succesfully connected to MongoDb  `))
  .catch((err) => console.log(err));
const app = express();
app.use(express.json());
app.listen(3000, () => {
  console.log(`Server listening on port 3000`);
});

app.use("/api/user", userRoutes);
app.use("/api/auth", authRoutes);
