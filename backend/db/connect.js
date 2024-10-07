import mongoose from "mongoose";

const connectDB = (url) => {
  mongoose.connect(url);
  console.log("connected to DB");
  return;
};
export default connectDB;
