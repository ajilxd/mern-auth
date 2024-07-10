import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: null,
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
  },
});

export const { adminSigninFailture, adminSigninSuccess } = adminSlice.actions;

export default adminSlice.reducer;
