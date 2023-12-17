import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API } from "../../utils/api";
import { RootState } from "..";
import { handleAxiosError } from "../../utils/handelError";

export const getUser = createAsyncThunk(
  "user/get",
  async (id: number, { getState, rejectWithValue }) => {
    try {
      const state = getState() as RootState;
      const respons = await axios.get(`${API}/users/${id}`, {
        headers: { Authorization: `Bearer ${state.auth.user?.access_token}` },
      });
      return respons.data;
    } catch (error) {
      return rejectWithValue(handleAxiosError(error));
    }
  }
);
