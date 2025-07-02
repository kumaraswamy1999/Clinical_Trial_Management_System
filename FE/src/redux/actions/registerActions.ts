import { createAsyncThunk } from "@reduxjs/toolkit";
import { registerApi } from "../../api/api";

export const submitUserForm = createAsyncThunk(
    "userRegister",
    async (formData : Record<string, unknown>, { rejectWithValue }) => {
        try {
            return await registerApi(formData);
        } catch (error: any) {
            return rejectWithValue(error.response.data);
        }
    }
);