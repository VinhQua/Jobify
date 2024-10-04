import { StatusCodes } from "http-status-codes";
import {
  BadRequestError,
  NotFoundError,
  UnAuthenticatedError,
} from "../errors/index.js";
import checkPermissions from "../utils/checkPermissions.js";
import mongoose from "mongoose";
import moment from "moment";
import Company from "../models/Company.js";
const createCompany = async (req, res) => {
  const { logo, name } = req.body;

  if (!logo || !name) {
    throw new BadRequestError("Please provide all values");
  }
  req.body.createdBy = req.user.userId;
  const company = await Company.create(req.body);
  res.status(StatusCodes.CREATED).json({ company });
};
const getAllCompanies = async (req, res) => {
  const { sort, search } = req.query;

  const queryObject = {
    createdBy: req.user.userId,
  };
  // add stuff based on condition

  if (search) {
    queryObject.name = { $regex: search, $options: "i" };
  }
  // NO AWAIT

  let result = Company.find(queryObject);

  // chain sort conditions

  if (sort === "latest") {
    result = result.sort("-createdAt");
  }
  if (sort === "oldest") {
    result = result.sort("createdAt");
  }
  if (sort === "a-z") {
    result = result.sort("name");
  }
  if (sort === "z-a") {
    result = result.sort("-name");
  }

  //

  // setup pagination
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  result = result.skip(skip).limit(limit);

  const companies = await result;

  const totalCompanies = await Company.countDocuments(queryObject);
  const numOfPages = Math.ceil(totalCompanies / limit);

  res.status(StatusCodes.OK).json({ companies, totalCompanies, numOfPages });
};
const updateCompany = async (req, res) => {
  const { id: companyId } = req.params;
  const { name } = req.body;

  if (!name || !name) {
    throw new BadRequestError("Please provide all values");
  }
  const company = await Company.findOne({ _id: companyId });

  if (!company) {
    throw new NotFoundError(`No company with id :${companyId}`);
  }
  // check permissions

  checkPermissions(req.user, company.createdBy);

  const updatedCompany = await Company.findOneAndUpdate(
    { _id: companyId },
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );

  res.status(StatusCodes.OK).json({ updatedCompany });
};
const deleteCompany = async (req, res) => {
  const { id: companyId } = req.params;

  const company = await Company.findOne({ _id: companyId });

  if (!company) {
    throw new NotFoundError(`No company with id :${company}`);
  }

  checkPermissions(req.user, company.createdBy);

  await company.remove();

  res.status(StatusCodes.OK).json({ msg: "Success! Company removed" });
};

export { createCompany, deleteCompany, getAllCompanies, updateCompany };
