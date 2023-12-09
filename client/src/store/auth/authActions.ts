import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API } from "../../utils/api";

export const LoginAction = createAsyncThunk(
  "auth/login",
  async (credential: string, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API}/auth/google/login`, {
        access_token: credential,
      });
      localStorage.setItem("user_data", JSON.stringify(response.data));
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.data) return rejectWithValue(error.response?.data);
        else return rejectWithValue(error.message);
      }
      console.log(error);
      return rejectWithValue("An unexpected error occurred");
    }
  }
);

export const LogoutAction = () => localStorage.removeItem("user_data");
