import { createAsyncThunk } from "@reduxjs/toolkit";
import { registerApi } from "../../api/api";

export const submitUserForm = createAsyncThunk(
  "userRegister",
  async ({formData,navigate,toast}: {formData: Record<string, unknown>;
      navigate: any;
      toast: any;
    },
    { rejectWithValue }
  ) => {
    console.log(formData)
    try {
      const response = await registerApi(formData);
      toast.success("Registration successful! Please login");
      navigate("/login/patient"); // or wherever you want to redirect
      return response;
    } catch (error: any) {
      toast.error("Registration failed!");
      return rejectWithValue(error.response?.data || "Unknown error");
    }
  }
);
