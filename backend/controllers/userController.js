import { StatusCodes } from "http-status-codes";
import User from "../models/User.js";
import NotFoundError from "../errors/not-found.js";
import BadRequestError from "../errors/bad-request.js";
import { client, invalidateCache } from "../utils/redis.js";

const registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  invalidateCache("/users");
  if (!name || !email || !password) {
    throw new BadRequestError("please provide all values");
  }
  const userAlreadyExists = await User.findOne({ email });
  if (userAlreadyExists) {
    throw new BadRequestError("Email already in use");
  }
  const user = await User.create({ name, email, password });

  return res.status(StatusCodes.CREATED).json({
    user: {
      email: user.email,
      name: user.name,
    },
    msg: "Success! User Created",
  });
};
const getAllUsers = async (req, res) => {
  const queryObject = {
    role: "admin",
  };

  // NO AWAIT

  let result = User.find(queryObject).select("-password");

  // setup pagination
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  result = result.skip(skip).limit(limit);
  let admins = await result;

  const totalAdmins = await User.countDocuments(queryObject);
  const numOfPages = Math.ceil(totalAdmins / limit);
  client.setEx(
    req.originalUrl,
    120,
    JSON.stringify({ admins, totalAdmins, numOfPages })
  );
  res.status(StatusCodes.OK).json({ admins, totalAdmins, numOfPages });
};

const updateUser = async (req, res) => {
  invalidateCache("/users");
  const { id: userId } = req.params;
  const { email, name } = req.body;

  if (!email || !name) {
    throw new BadRequestError("Please provide all values");
  }
  const user = await User.findOne({ _id: userId });
  if (!user) {
    throw new NotFoundError(`No user with id :${userId}`);
  }
  user.email = email;
  user.name = name;

  await user.save();

  res.status(StatusCodes.OK).json({ user, msg: "Success! User Updated" });
};
const deleteUser = async (req, res) => {
  invalidateCache("/users");
  const { id: userId } = req.params;

  const user = await User.findOne({ _id: userId });

  if (!user) {
    throw new NotFoundError(`No user with id :${userId}`);
  }

  await user.remove();

  res.status(StatusCodes.OK).json({ msg: "Success! User removed" });
};
export { getAllUsers, updateUser, deleteUser, registerUser };
