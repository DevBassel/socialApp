import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API } from "../../utils/api";
import { RootState } from "..";
import { handleAxiosError } from "../../utils/handelError";

export const getMe = createAsyncThunk(
  "user/getMe",
  async (_, { getState, rejectWithValue }) => {
    try {
      const state = getState() as RootState;
      const { data } = await axios.get(`${API}/users/me`, {
        headers: {
          Authorization: `Bearer ${state.auth.userData?.access_token}`,
        },
      });
      localStorage.setItem("user-info", JSON.stringify(data));
      return data;
    } catch (error) {
      return rejectWithValue(handleAxiosError(error));
    }
  }
);
