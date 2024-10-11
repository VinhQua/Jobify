import { StatusCodes } from "http-status-codes";
import User from "../models/User.js";
const getAllUsers = async (req, res) => {
  const queryObject = {
    role: "admin",
  };
  const users = await User.find(queryObject).select("+password");

  res.status(StatusCodes.OK).json({ users });
};
const getSingleUser = async (req, res) => {
  const { id } = req.params;
  const user = await User.findOne({ where: { id } });
  if (!user) {
    throw new NotFound(`no user with id ${id}`);
  }
  res.status(StatusCodes.OK).json({ user });
};
const showCurrentUser = async (req, res) => {
  const user = await User.findOne({ where: { email: req.user.email } });
  return res.status(StatusCodes.OK).json({
    user: {
      name: user.name,
      email: user.email,
      role: user.role,
      image: user.image,
      contact: user.contact,
      address: user.address,
    },
  });
};
const updateUser = async (req, res) => {
  const id = req.user.userId;
  const { password, name, email, address, contact, image } = req.body;
  const updatedUser = { name, email, address, contact, image };
  if (password) {
    updatedUser.password = await hashPassword(password);
  }
  const user = await User.update({ ...updatedUser }, { where: { id } });
  if (!user) {
    throw new NotFound(`no user with id ${id}`);
  }
  res.status(StatusCodes.OK).json({ msg: "Success! User updated" });
};
const deleteUser = async (req, res) => {
  const id = req.user.userId;
  const { password, name, email, address, contact, image } = req.body;
  const updatedUser = { name, email, address, contact, image };
  if (password) {
    updatedUser.password = await hashPassword(password);
  }
  const user = await User.update({ ...updatedUser }, { where: { id } });
  if (!user) {
    throw new NotFound(`no user with id ${id}`);
  }
  res.status(StatusCodes.OK).json({ msg: "Success! User updated" });
};
export { getAllUsers, getSingleUser, showCurrentUser, updateUser, deleteUser };
