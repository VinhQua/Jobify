import Job from "../models/Job.js";
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
import { uploadFileToGoogleCloud } from "../utils/google-cloud.js";
import { client, invalidateCache } from "../utils/redis.js";
const createJob = async (req, res) => {
  const {
    company,
    description,
    jobType,
    jobSalary,
    pdf,
    jobLocation,
    jobPosition,
  } = req.body;

  if (
    !jobPosition ||
    !company ||
    !description ||
    !jobType ||
    !jobSalary ||
    !jobLocation
  ) {
    throw new BadRequestError("Please provide all values");
  }
  const companies = await Company.find();
  const companyId = companies.filter((item) => item.name === company)[0]._id;
  req.body.createdBy = req.user.userId;
  req.body.company = companyId;
  const job = await Job.create(req.body);
  invalidateCache("/jobs");
  res.status(StatusCodes.CREATED).json({ job });
};
const getAllJobs = async (req, res) => {
  const { company, jobSalary, jobType, sort, search } = req.query;

  const queryObject = {
    createdBy: req.user.userId,
  };
  // add stuff based on condition
  const companies = await Company.find();

  if (company && company !== "all") {
    const companyId = companies.filter((item) => item.name === company)[0]._id;
    queryObject.company = companyId;
  }
  if (jobType && jobType !== "all") {
    queryObject.jobType = jobType;
  }
  if (jobSalary) {
    queryObject.jobSalary = { $lte: jobSalary };
  }
  if (search) {
    queryObject.jobPosition = { $regex: search, $options: "i" };
  }
  // NO AWAIT

  let result = Job.find(queryObject);

  // chain sort conditions

  if (sort === "latest") {
    result = result.sort("-createdAt");
  }
  if (sort === "oldest") {
    result = result.sort("createdAt");
  }
  if (sort === "a-z") {
    result = result.sort("position");
  }
  if (sort === "z-a") {
    result = result.sort("-position");
  }

  //

  // setup pagination
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  result = result.skip(skip).limit(limit);

  let jobs = await result.populate("company");

  const totalJobs = await Job.countDocuments(queryObject);
  const numOfPages = Math.ceil(totalJobs / limit);
  const searchSuggestions = (await Job.find()).map(
    (job) => new Object({ id: job._id, name: job.jobPosition })
  );
  const companyList = companies.map((company) => company.name);
  client.setEx(
    req.originalUrl,
    120,
    JSON.stringify({
      searchSuggestions,
      jobs,
      totalJobs,
      numOfPages,
      companyList,
    })
  );
  res
    .status(StatusCodes.OK)
    .json({ searchSuggestions, jobs, totalJobs, numOfPages, companyList });
};
const updateJob = async (req, res) => {
  invalidateCache("/jobs");
  const { id: jobId } = req.params;
  const {
    company,
    description,
    jobType,
    jobSalary,
    pdf,
    jobLocation,
    jobPosition,
  } = req.body;

  if (
    !jobPosition ||
    !company ||
    !description ||
    !jobType ||
    !jobSalary ||
    !jobLocation
  ) {
    throw new BadRequestError("Please provide all values");
  }
  const job = await Job.findOne({ _id: jobId });

  if (!job) {
    throw new NotFoundError(`No job with id :${jobId}`);
  }

  const updatedJob = await Job.findOneAndUpdate({ _id: jobId }, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(StatusCodes.OK).json({ updatedJob });
};
const deleteJob = async (req, res) => {
  invalidateCache("/jobs");
  const { id: jobId } = req.params;

  const job = await Job.findOne({ _id: jobId });

  if (!job) {
    throw new NotFoundError(`No job with id :${jobId}`);
  }

  await job.remove();

  res.status(StatusCodes.OK).json({ msg: "Success! Job removed" });
};
const showStats = async (req, res) => {
  let stats = await Job.aggregate([
    { $match: { createdBy: mongoose.Types.ObjectId(req.user.userId) } },
    { $group: { _id: "$status", count: { $sum: 1 } } },
  ]);
  stats = stats.reduce((acc, curr) => {
    const { _id: title, count } = curr;
    acc[title] = count;
    return acc;
  }, {});

  const defaultStats = {
    pending: stats.pending || 0,
    interview: stats.interview || 0,
    declined: stats.declined || 0,
  };

  let monthlyApplications = await Job.aggregate([
    { $match: { createdBy: mongoose.Types.ObjectId(req.user.userId) } },
    {
      $group: {
        _id: { year: { $year: "$createdAt" }, month: { $month: "$createdAt" } },
        count: { $sum: 1 },
      },
    },
    { $sort: { "_id.year": -1, "_id.month": -1 } },
    { $limit: 6 },
  ]);
  monthlyApplications = monthlyApplications
    .map((item) => {
      const {
        _id: { year, month },
        count,
      } = item;
      const date = moment()
        .month(month - 1)
        .year(year)
        .format("MMM Y");
      return { date, count };
    })
    .reverse();

  res.status(StatusCodes.OK).json({ defaultStats, monthlyApplications });
};
const uploadFile = async (req, res) => {
  uploadFileToGoogleCloud(req, res);
};
export { createJob, deleteJob, getAllJobs, updateJob, showStats, uploadFile };
