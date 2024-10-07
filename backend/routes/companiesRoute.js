import express from "express";
const router = express.Router();

import {
  createCompany,
  deleteCompany,
  getAllCompanies,
  updateCompany,
  uploadLogo,
} from "../controllers/companiesController.js";

import testUser from "../middleware/testUser.js";

router.route("/").post(testUser, createCompany).get(getAllCompanies);
router.route("/uploadLogo").post(testUser, uploadLogo);
// remember about :id
router
  .route("/:id")
  .delete(testUser, deleteCompany)
  .patch(testUser, updateCompany);

export default router;
