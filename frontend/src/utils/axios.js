import axios from "axios";
import { clearStore } from "../features/users/userSlice";

const customFetch = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

export const checkForUnauthorizedResponse = (error, thunkAPI) => {
  if (error.response.status === 401) {
    return thunkAPI.dispatch(clearStore("Unauthorized! Logging out..."));
  }
  return thunkAPI.rejectWithValue(error.response.data.msg);
};
export default customFetch;
