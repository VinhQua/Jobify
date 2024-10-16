import express from "express";
const app = express();
import dotenv from "dotenv";
dotenv.config();
import "express-async-errors";
import morgan from "morgan";

import { dirname } from "path";
import { fileURLToPath } from "url";
import path from "path";
import cors from "cors";
import helmet from "helmet";
import xss from "xss-clean";
import mongoSanitize from "express-mongo-sanitize";
import cookieParser from "cookie-parser";
// hello
// db and authenticateUser
import connectDB from "./db/connect.js";

// routers
import authRouter from "./routes/authRoutes.js";
import jobsRouter from "./routes/jobsRoutes.js";
import companiesRouter from "./routes/companiesRoute.js";
import usersRouter from "./routes/userRoute.js";

// middleware
import notFoundMiddleware from "./middleware/not-found.js";
import errorHandlerMiddleware from "./middleware/error-handler.js";
import { auth, authorizePermission } from "./middleware/auth.js";
import mongoose from "mongoose";

if (process.env.NODE_ENV !== "production") {
  app.use(morgan("dev"));
}

app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:5173", "https://jobifiez.netlify.app"],
    methods: "GET,POST,PUT,DELETE,PATCH",
    credentials: true,
    allowedHeaders: [
      "Origin",
      "X-Requested-With",
      "Content-Type",
      "Authorization",
      "Accept",
      "X-Access-Token",
    ],

    // preflightContinue: true,
  })
);

app.use(helmet());
app.use(xss());
app.use(mongoSanitize());
app.use(cookieParser(process.env.JWT_SECRET));

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/jobs", auth, jobsRouter);
app.use("/api/v1/companies", auth, companiesRouter);
app.use("/api/v1/users", auth, authorizePermission("super-admin"), usersRouter);

// only when ready to deploy
app.get("*", (req, res) => {
  res.send("Jobify API");
});

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 5000;

const start = async () => {
  try {
    // connect to DB
    await connectDB(process.env.MONGO_URL);

    app.listen(port, () => {
      console.log(`Server is listening on port ${port}...`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
