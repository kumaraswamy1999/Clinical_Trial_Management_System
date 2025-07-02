// redux/auth/LoginSlice.ts
import { createSlice } from "@reduxjs/toolkit";
import { submitLoginForm } from "../actions/loginActions";

const loginSlice = createSlice({
  name: "auth",
  initialState: {
    loading: false,
    user: null,
    error: "",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(submitLoginForm.pending, (state) => {
        state.loading = true;
      })
      .addCase(submitLoginForm.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.error = "";
      })
      .addCase(submitLoginForm.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.error as Error).message || "Login failed";
      });
  },
});

export default loginSlice.reducer;
