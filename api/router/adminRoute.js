import express from "express";

import {
  adminLogin,
  usersFinder,
  editUser,
  updateUser,
  deleteUser,
  addUser,
  signoutHandler,
} from "../controller/adminController.js";

const router = express.Router();

router.post("/login", adminLogin);
router.get("/users", usersFinder);
router.get("/edit/:id", editUser);
router.post("/update/:id", updateUser);
router.delete("/delete/:id", deleteUser);
router.post("/createuser", addUser);
router.get("/signout", signoutHandler);

export default router;
