import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoutes from "./router/userRoute.js";
import authRoutes from "./router/authRoute.js";
import cookieParser from "cookieparser";

dotenv.config();

mongoose
  .connect(process.env.MONGO)
  .then(() => console.log(`Succesfully connected to MongoDb  `))
  .catch((err) => console.log(err));
const app = express();
app.use(express.json());
app.use(cookieParser());
app.listen(3000, () => {
  console.log(`Server listening on port 3000`);
});

app.use("/api/user", userRoutes);
app.use("/api/auth", authRoutes);
app.use;
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "internal server error";
  return res.status(statusCode).json({
    success: false,
    message,
    statusCode,
  });
});
