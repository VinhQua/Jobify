import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import customFetch from "../../utils/axios";
import { logoutUser } from "../users/userSlice";
import { toast } from "react-toastify";

const initialState = {
  isLoading: true,
  admins: [],
  totalAdmins: 0,
  numOfPages: 1,
  page: 1,
};

export const getAllAdmins = createAsyncThunk("allAdmins/getAdmins");
const allAdminsSlice = createSlice({
  name: "allAdmins",
  initialState,
  reducers: {
    showLoading: (state) => {
      state.isLoading = true;
    },
    hideLoading: (state) => {
      state.isLoading = false;
    },
    handleAdminFiltersInput: (state, { payload }) => {
      const { name, value } = payload;

      return { ...state, page: 1, [name]: value };
    },
    changePage: (state, { payload }) => {
      state.page = payload;
    },
    clearAllAdminState: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllAdmins.pending, (state, { payload }) => {
        state.isLoading = true;
      })
      .addCase(getAllAdmins.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.admins = payload.admins;
        state.numOfPages = payload.numOfPages;
        state.totalAdmins = payload.totalAdmins;
      })
      .addCase(getAllAdmins.rejected, (state, { payload }) => {
        state.isLoading = false;
        toast.error(payload);
      });
  },
});
export const {
  changePage,
  showLoading,
  hideLoading,
  handleFiltersInput,
  clearJobFilters,
  clearAllJobState,
} = allAdminsSlice.actions;
export default allAdminsSlice.reducer;
