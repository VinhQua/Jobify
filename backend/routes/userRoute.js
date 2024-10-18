import express from "express";
const router = express.Router();

import {
  deleteUser,
  getAllUsers,
  registerUser,
  updateUser,
} from "../controllers/userController.js";
import { cacheMiddleware } from "../utils/redis.js";

router.route("/").post(registerUser).get(cacheMiddleware, getAllUsers);

// remember about :id

router.route("/:id").delete(deleteUser).patch(updateUser);

export default router;
