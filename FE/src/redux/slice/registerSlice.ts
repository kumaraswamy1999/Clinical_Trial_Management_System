import { createSlice } from "@reduxjs/toolkit";
import { submitUserForm } from "../actions/registerActions";

const userRegisterSlice = createSlice({
    name: "userRegister",
    initialState: {
        status: "idle",
        data: null,
        error: null as unknown,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(submitUserForm.pending, (state) => {
                state.status = "loading";
            })
            .addCase(submitUserForm.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.data = action.payload;
            })
            .addCase(submitUserForm.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload;
            });
    },
});

export default userRegisterSlice.reducer;
