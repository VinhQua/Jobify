import customFetch, { checkForUnauthorizedResponse } from "../../utils/axios";

export const getAllCompaniesThunk = async (_, thunkAPI) => {
  const { search } = thunkAPI.getState().allCompanies;
  let url = `companies`;
  if (search) {
    url += `&search=${search}`;
  }
  try {
    const { data } = await customFetch.get(url);

    return data;
  } catch (error) {
    checkForUnauthorizedResponse(error, thunkAPI);
  }
};
