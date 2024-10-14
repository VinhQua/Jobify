import express from "express";
const router = express.Router();

import {
  deleteUser,
  getAllUsers,
  registerUser,
  updateUser,
} from "../controllers/userController.js";

router.route("/").post(registerUser).get(getAllUsers);

// remember about :id

router.route("/:id").delete(deleteUser).patch(updateUser);

export default router;
