import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API } from "../../utils/api";
import { RootState } from "..";
import { handleAxiosError } from "../../utils/handelError";

export const getChats = createAsyncThunk(
  "chats/get",
  async (_, { getState, rejectWithValue }) => {
    try {
      const state = getState() as RootState;
      const response = await axios.get(`${API}/chats`, {
        headers: {
          Authorization: `Bearer ${state.auth.user?.access_token}`,
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(handleAxiosError(error));
    }
  }
);
