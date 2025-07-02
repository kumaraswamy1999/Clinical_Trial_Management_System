import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { LOGIN_API_URL } from "../../constants/constants";

export const submitLoginForm = createAsyncThunk(
    "login",
    async (formData: { email: string; password: string }) => {
      const response = await axios.post(LOGIN_API_URL, formData);
      return response.data;
    }
  );