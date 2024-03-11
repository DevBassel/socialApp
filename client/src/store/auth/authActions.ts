import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API } from "../../utils/api";
import { handleAxiosError } from "../../utils/handelError";

export const LoginGoogle = createAsyncThunk(
  "auth/google",
  async (credential: string, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API}/auth/google`, {
        access_token: credential,
      });
      localStorage.setItem("user_data", JSON.stringify(response.data));
      return response.data;
    } catch (error) {
      return rejectWithValue(handleAxiosError(error));
    }
  }
);

export const LogoutAction = () => {
  localStorage.removeItem("user_data");
  localStorage.removeItem("user-info");
};
