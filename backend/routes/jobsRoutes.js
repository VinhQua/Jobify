import express from "express";
const router = express.Router();

import {
  createJob,
  deleteJob,
  getAllJobs,
  updateJob,
  showStats,
  uploadFile,
} from "../controllers/jobsController.js";

import testUser from "../middleware/testUser.js";
import { cacheMiddleware } from "../utils/redis.js";

router.route("/").post(testUser, createJob).get(cacheMiddleware, getAllJobs);
router.route("/uploadFile").post(testUser, uploadFile);
router.route("/:id").delete(testUser, deleteJob).patch(testUser, updateJob);

export default router;
