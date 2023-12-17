import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "..";
import { API } from "../../utils/api";
import { handleAxiosError } from "../../utils/handelError";

export const getFriends = createAsyncThunk(
  "friends/get",
  async (_, { getState, rejectWithValue }) => {
    try {
      const state = getState() as RootState;
      const respons = await axios.get(`${API}/friend`, {
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
