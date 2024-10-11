import express from "express";
const router = express.Router();

import {
  deleteUser,
  getAllUsers,
  updateUser,
} from "../controllers/userController.js";
import { register } from "../controllers/authController.js";

router.route("/").post(register).get(getAllUsers);

// remember about :id

router.route("/:id").delete(deleteUser).patch(updateUser);

export default router;
