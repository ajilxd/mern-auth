import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: "",
  loading: false,
  error: null,
};

const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    adminSigninSuccess: (state) => {
      state.currentUser = "admin";
      state.error = false;
    },
    adminSigninFailture: (state, action) => {
      state.error = action.payload;
    },
    adminSignoutSuccess: (state) => {
      state.currentUser = "";
    },
  },
});

export const { adminSigninFailture, adminSigninSuccess, adminSignoutSuccess } =
  adminSlice.actions;

export default adminSlice.reducer;
