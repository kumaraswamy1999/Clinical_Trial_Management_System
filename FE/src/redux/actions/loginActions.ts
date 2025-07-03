import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { LOGIN_API_URL } from "../../constants/constants";
import { loginApi } from "../../api/api";

export const submitLoginForm = createAsyncThunk(
  "login",
  async (
    {
      formData,
      navigate,
      toast,
    }: {
      formData: { email: string; password: string ,role:string};
      navigate: any;
      toast: any;
    },
    { rejectWithValue }
  ) => {
    try {
      console.log(formData)
      const resultData:any = await loginApi(formData);
      if(Object.keys(resultData).length){
        const {token,...rest}=resultData.response
        console.log("response",token,rest)
        localStorage.setItem('user',JSON.stringify({...rest,role:formData?.role}))
        localStorage.setItem('token',JSON.stringify(token))

      }
      toast.success("Login successful!");
      navigate("/dashboard"); // or wherever you want to redirect
      return resultData.response;
    } catch (error: any) {
      toast.error("Login failed!");
      return rejectWithValue(error.response?.data || "Unknown error");
    }
  }
);
