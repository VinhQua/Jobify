import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import {
  createAdminThunk,
  deleteAdminThunk,
  editAdminThunk,
} from "./adminThunk";
const initialState = {
  isLoading: false,
  name: "",
  email: "",
  password: "",
  isEditing: false,
  editAdminId: "",
};
export const createAdmin = createAsyncThunk(
  "job/createAdmin",
  createAdminThunk
);
export const deleteAdmin = createAsyncThunk(
  "job/deleteAdmin",
  deleteAdminThunk
);
export const editAdmin = createAsyncThunk("job/editAdmin", editAdminThunk);
const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    handleAdminInput: (state, { payload }) => {
      const { name, value } = payload;
      state[name] = value;
    },
    clearValue: () => {
      return {
        ...initialState,
      };
    },
    setEditAdmin: (state, { payload }) => {
      return { ...state, isEditing: true, ...payload };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createAdmin.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(createAdmin.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        toast.success("Admin Created");
      })
      .addCase(createAdmin.rejected, (state, { payload }) => {
        state.isLoading = false;
        toast.error(payload);
      })
      .addCase(deleteAdmin.pending, (state) => {})
      .addCase(deleteAdmin.fulfilled, (state, { payload }) => {
        toast.success(payload);
      })
      .addCase(deleteAdmin.rejected, (state, { payload }) => {
        toast.error(payload);
      })
      .addCase(editAdmin.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(editAdmin.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        console.log(payload);
        toast.success("Admin Updated");
      })
      .addCase(editAdmin.rejected, (state, { payload }) => {
        state.isLoading = false;
        toast.error(payload);
      });
  },
});
export const { handleAdminInput, clearValue, setEditAdmin } =
  adminSlice.actions;
export default adminSlice.reducer;
