import mongoose from "mongoose";

const CompanySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide company"],
      maxlength: 50,
      unique: true,
    },
    logo: {
      type: String,
      required: [true, "Please provide logo"],
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: [true, "Please provide user"],
    },
  },
  { timestamps: true }
);

export default mongoose.model("Company", CompanySchema);
