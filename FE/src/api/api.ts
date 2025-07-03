import { LOGIN_API_URL, REGISTER_API_URL } from "../constants/constants";
import { axiosInstance } from "./axiosInstance";
import { AxiosError } from "axios";

export const loginApi = async (formData: Record<string, unknown>): Promise<unknown> => {
  try {
    const response = await axiosInstance.post(LOGIN_API_URL, formData);
    return response.data;
  } catch (error) {
    const err = error as AxiosError<{ message: string }>;
    throw new Error(err.response?.data?.message || 'Login failed');
  }
};

export const registerApi = async (formData: Record<string, unknown>): Promise<unknown> => {
  const response = await axiosInstance.post(REGISTER_API_URL, formData);
  return response.data;
};
