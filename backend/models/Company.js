import mongoose from "mongoose";

const CompanySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide company"],
      maxlength: 50,
    },
    logo: {
      data: Buffer,
      contentType: String,
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
