import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API } from "../../utils/api";
import { RootState } from "..";

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
      if (axios.isAxiosError(error)) {
        if (error.response?.data) return rejectWithValue(error.response?.data);
        else return rejectWithValue(error.message);
      }
      console.log(error);
      return rejectWithValue("An unexpected error occurred");
    }
  }
);
