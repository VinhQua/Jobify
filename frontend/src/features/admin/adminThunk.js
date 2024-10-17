import customFetch, { checkForUnauthorizedResponse } from "../../utils/axios";
import { clearValue } from "./adminSlice";

import {
  getAllAdmins,
  hideLoading,
  showLoading,
} from "../allUsers/allUsersSlice";

export const createAdminThunk = async (admin, thunkAPI) => {
  try {
    const { data } = await customFetch.post("users", admin);
    thunkAPI.dispatch(clearValue());
    return data;
  } catch (error) {
    return checkForUnauthorizedResponse(error, thunkAPI);
  }
};

export const deleteAdminThunk = async (adminId, thunkAPI) => {
  try {
    thunkAPI.dispatch(showLoading());
    const { data } = await customFetch.delete(`users/${adminId}`);
    thunkAPI.dispatch(getAllAdmins());
    return data.msg;
  } catch (error) {
    thunkAPI.dispatch(hideLoading());
    return checkForUnauthorizedResponse(error, thunkAPI);
  }
};

export const editAdminThunk = async ({ adminId, admin }, thunkAPI) => {
  try {
    const { data } = await customFetch.patch(`users/${adminId}`, admin);
    thunkAPI.dispatch(clearValue());
    return data;
  } catch (error) {
    return checkForUnauthorizedResponse(error, thunkAPI);
  }
};
