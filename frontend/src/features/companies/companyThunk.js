import customFetch, { checkForUnauthorizedResponse } from "../../utils/axios";
import {
  getAllCompanies,
  hideLoading,
  showLoading,
} from "../allCompanies/allCompaniesSlice";

import { clearValue } from "./companySlice";

export const createCompanyThunk = async (company, thunkAPI) => {
  try {
    const { data } = await customFetch.post("companies", company);
    thunkAPI.dispatch(clearValue());
    return data;
  } catch (error) {
    return checkForUnauthorizedResponse(error, thunkAPI);
  }
};

export const deleteCompanyThunk = async (companyId, thunkAPI) => {
  try {
    thunkAPI.dispatch(showLoading());
    const { data } = await customFetch.delete(`companies/${companyId}`);
    thunkAPI.dispatch(getAllCompanies());
    return data.msg;
  } catch (error) {
    thunkAPI.dispatch(hideLoading());
    return checkForUnauthorizedResponse(error, thunkAPI);
  }
};

export const editCompanyThunk = async ({ companyId, company }, thunkAPI) => {
  try {
    const { data } = await customFetch.patch(
      `/companies/${companyId}`,
      company
    );
    thunkAPI.dispatch(clearValue());
    return data;
  } catch (error) {
    return checkForUnauthorizedResponse(error, thunkAPI);
  }
};
