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

router.route("/").post(testUser, createJob).get(getAllJobs);
router.route("/uploadFile").post(testUser, uploadFile);
// remember about :id
router.route("/stats").get(showStats);
router.route("/:id").delete(testUser, deleteJob).patch(testUser, updateJob);

export default router;
