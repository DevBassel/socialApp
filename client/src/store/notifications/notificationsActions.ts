import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API } from "../../utils/api";
import { RootState } from "..";
import { handleAxiosError } from "../../utils/handelError";

export const getNotifications = createAsyncThunk(
  "notifications/get",
  async (_, { getState, rejectWithValue }) => {
    try {
      const state = getState() as RootState;

      const respons = await axios.get(`${API}/notifications`, {
        headers: {
          Authorization: `Bearer ${state.auth.user?.access_token}`,
        },
      });

      return respons.data;
    } catch (error) {
      return rejectWithValue(handleAxiosError(error));
    }
  }
);
