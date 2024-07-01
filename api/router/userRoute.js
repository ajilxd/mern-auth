import express from "express";
import { verifyToken } from "../utils/verifyUser";
import { updateUser } from "../controller/userController";

const router = express.Router();

router.post("/update/:id", verifyToken, updateUser);

export default router;
