import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { getAllCompaniesThunk } from "./allCompaniesThunk";
const initialFiltersState = {
  search: "",
  sort: "latest",
  sortOptions: ["latest", "oldest", "a-z", "z-a"],
};

const initialState = {
  isLoading: true,
  companies: [],
  totalCompanies: 0,
  numOfPages: 1,
  page: 1,

  ...initialFiltersState,
};

export const getAllCompanies = createAsyncThunk(
  "allCompanies/getCompanies",
  getAllCompaniesThunk
);

const allCompaniesSlice = createSlice({
  name: "allCompanies",
  initialState,
  reducers: {
    showLoading: (state) => {
      state.isLoading = true;
    },
    hideLoading: (state) => {
      state.isLoading = false;
    },
    handleCompanyFiltersInput: (state, { payload }) => {
      const { name, value } = payload;

      return { ...state, page: 1, [name]: value };
    },
    clearCompanyFilters: (state) => {
      return { ...state, ...initialFiltersState };
    },
    changePage: (state, { payload }) => {
      state.page = payload;
    },
    clearAllCompanyState: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllCompanies.pending, (state, { payload }) => {
        state.isLoading = true;
      })
      .addCase(getAllCompanies.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.companies = payload.companies;
        state.numOfPages = payload.numOfPages;
        state.totalCompanies = payload.totalCompanies;
      })
      .addCase(getAllCompanies.rejected, (state, { payload }) => {
        state.isLoading = false;
        toast.error(payload);
      });
  },
});
export const {
  changePage,
  showLoading,
  hideLoading,
  handleCompanyFiltersInput,
  clearCompanyFilters,
  clearAllCompanyState,
} = allCompaniesSlice.actions;
export default allCompaniesSlice.reducer;
