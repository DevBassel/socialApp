import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API } from "../../utils/api";
import { RootState } from "..";
import { handleAxiosError } from "../../utils/handelError";

export const getPosts = createAsyncThunk(
  "posts/get",
  async (_, { getState, rejectWithValue }) => {
    const state = getState() as RootState;
    try {
      const response = await axios.get(`${API}/posts`, {
        headers: { Authorization: `Bearer ${state.auth.user?.access_token}` },
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

export const getPost = createAsyncThunk(
  "posts/getPost",
  async (id: number, { getState, rejectWithValue }) => {
    try {
      const state = getState() as RootState;
      const response = await axios.get(`${API}/posts/${id}`, {
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

export const lovePost = createAsyncThunk(
  "posts/love",
  async (postId: number, { getState, rejectWithValue }) => {
    try {
      const state = getState() as RootState;
      const { data } = await axios.post(
        `${API}/posts/love`,
        { postId },
        {
          headers: { Authorization: `Bearer ${state.auth.user?.access_token}` },
        }
      );

      return data;
    } catch (error) {
      return rejectWithValue(handleAxiosError(error));
    }
  }
);
