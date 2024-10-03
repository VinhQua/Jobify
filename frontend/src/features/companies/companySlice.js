import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  createCompanyThunk,
  deleteCompanyThunk,
  editCompanyThunk,
} from "./companyThunk";
import { toast } from "react-toastify";
const initialState = {
  isLoading: false,
  editCompanyId: "",
  isEditing: false,
  name: "",
  logo: "https://www.incnow.com/wp-content/uploads/2023/08/Shutterstock_1059255266-scaled.jpg",
};
export const createCompany = createAsyncThunk(
  "company/createCompany",
  createCompanyThunk
);
export const deleteCompany = createAsyncThunk(
  "company/deleteCompany",
  deleteCompanyThunk
);
export const editCompany = createAsyncThunk(
  "company/editCompany",
  editCompanyThunk
);
const companySlice = createSlice({
  name: "company",
  initialState,
  reducers: {
    handleCompanyInput: (state, { payload }) => {
      const { name, value } = payload;
      state[name] = value;
    },
    clearValue: () => {
      return {
        ...initialState,
      };
    },
    setEditCompany: (state, { payload }) => {
      return { ...state, isEditing: true, ...payload };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createCompany.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(createCompany.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        toast.success("company Created");
      })
      .addCase(createCompany.rejected, (state, { payload }) => {
        state.isLoading = false;
        toast.error(payload);
      })
      .addCase(deleteCompany.pending, (state) => {})
      .addCase(deleteCompany.fulfilled, (state, { payload }) => {
        toast.success(payload);
      })
      .addCase(deleteCompany.rejected, (state, { payload }) => {
        toast.error(payload);
      })
      .addCase(editCompany.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(editCompany.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        console.log(payload);
        toast.success("company Updated");
      })
      .addCase(editCompany.rejected, (state, { payload }) => {
        state.isLoading = false;
        toast.error(payload);
      });
  },
});
export const { handleCompanyInput, clearValue, setEditCompany } =
  companySlice.actions;
export default companySlice.reducer;
