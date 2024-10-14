import { StatusCodes } from "http-status-codes";
import User from "../models/User.js";
import NotFoundError from "../errors/not-found.js";
import BadRequestError from "../errors/bad-request.js";
const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    throw new BadRequestError("please provide all values");
  }
  const userAlreadyExists = await User.findOne({ email });
  if (userAlreadyExists) {
    throw new BadRequestError("Email already in use");
  }
  const user = await User.create({ name, email, password });

  res.status(StatusCodes.CREATED).json({
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
  const users = await User.find(queryObject).select("+password");

  res.status(StatusCodes.OK).json({ users });
};

const updateUser = async (req, res) => {
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
  const { id: userId } = req.params;

  const user = await User.findOne({ _id: userId });

  if (!user) {
    throw new NotFoundError(`No user with id :${userId}`);
  }

  await user.remove();

  res.status(StatusCodes.OK).json({ msg: "Success! User removed" });
};
export { getAllUsers, updateUser, deleteUser, registerUser };
