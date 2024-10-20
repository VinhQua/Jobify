import { Storage } from "@google-cloud/storage";
import { StatusCodes } from "http-status-codes";
import Multer from "multer";
import dotenv from "dotenv";
dotenv.config();
import util, { format } from "util";

let processFile = Multer({
  storage: Multer.memoryStorage(),
  limits: {
    fileSize: 2 * 1024 * 1024,
  },
}).single("file");
let processFileMiddleware = util.promisify(processFile);
const storage = new Storage({
  projectId: process.env.projectId,
  credentials: {
    client_email: process.env.client_email,
    private_key: process.env.private_key,
    private_key_id: process.env.private_key_id,
  },
});
const bucket = storage.bucket("jobify");
const uploadFileToGoogleCloud = async (req, res) => {
  try {
    await processFileMiddleware(req, res);
    if (!req.file) {
      throw new BadRequestError("Please provide a file");
    }

    // create new blob in the bucket and upload the file data
    const blob = bucket.file(req.file.originalname);
    const blobStream = blob.createWriteStream({ resumable: false });
    blobStream.on("error", (err) => {
      res.status(500).json({ msg: err.message });
    });
    let publicUrl;
    blobStream.on("finish", async (data) => {
      // create URL for directly file access via HTTP
      publicUrl = format(
        `https://storage.cloud.google.com/${bucket.name}/${blob.name}`
      );

      res
        .status(StatusCodes.CREATED)
        .json({ url: publicUrl, msg: "File Uploaded!" });
    });
    blobStream.end(req.file.buffer);
  } catch (error) {
    if (error.code == "LIMIT_FILE_SIZE") {
      return res
        .status(500)
        .json({ msg: `File size cannot be larger than 2MB!` });
    }
    return res
      .status(500)
      .json({ msg: `Could not upload the file: ${req.file.originalname}` });
  }
};

export { uploadFileToGoogleCloud };
