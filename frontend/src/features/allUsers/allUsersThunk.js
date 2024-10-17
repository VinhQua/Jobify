import customFetch, { checkForUnauthorizedResponse } from "../../utils/axios";

export const getAllUsersThunk = async (_, thunkAPI) => {
  const { page } = thunkAPI.getState().allAdmins;
  let url = `users?page=${page}`;

  try {
    const { data } = await customFetch.get(url);

    return data;
  } catch (error) {
    checkForUnauthorizedResponse(error, thunkAPI);
  }
};
