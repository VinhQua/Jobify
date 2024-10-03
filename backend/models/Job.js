import { Binary, BSONType } from "mongodb";
import mongoose from "mongoose";

const JobSchema = new mongoose.Schema(
  {
    description: {
      type: String,
      required: [true, "Please provide description"],
    },
    jobType: {
      type: String,
      enum: ["full-time", "part-time", "remote", "internship"],
      default: "full-time",
    },
    jobSalary: {
      type: Number,
      required: [true, "Please provide salary"],
    },
    pdf: {
      type: String,
    },
    jobLocation: {
      type: String,
      default: "my city",
      required: true,
    },
    jobPosition: {
      type: String,
      default: "my city",
      required: true,
    },
    company: {
      type: mongoose.Types.ObjectId,
      ref: "Company",
      required: [true, "Please provide company"],
    },
  },
  { timestamps: true }
);

export default mongoose.model("Job", JobSchema);
