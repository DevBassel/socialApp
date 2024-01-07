import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "..";
import { API } from "../../utils/api";
import { handleAxiosError } from "../../utils/handelError";

export interface CommentProp {
  postId: number;
  content: string;
}
export const createComment = createAsyncThunk(
  "comments/create",
  async (data: CommentProp, { getState, rejectWithValue }) => {
    try {
      const state = getState() as RootState;

      const response = await axios.post(`${API}/comments`, data, {
        headers: {
          Authorization: `Bearer ${state.auth.user?.access_token}`,
        },
      });

      return [response.data];
    } catch (error) {
      return rejectWithValue(handleAxiosError(error));
    }
  }
);

export const removeComment = createAsyncThunk(
  "comments/remove",
  async (id: number, { getState, rejectWithValue }) => {
    try {
      const state = getState() as RootState;
      const { data } = await axios.delete(`${API}/comments/${id}`, {
        headers: {
          Authorization: `Bearer ${state.auth.user?.access_token}`,
        },
      });
      return data;
    } catch (error) {
      return rejectWithValue(handleAxiosError(error));
    }
  }
);
export const updateComment = createAsyncThunk(
  "comments/update",
  async (
    { content, id }: { content: string; id: number },
    { getState, rejectWithValue }
  ) => {
    try {
      const state = getState() as RootState;
      const { data } = await axios.patch(
        `${API}/comments/${id}`,
        { content },
        {
          headers: {
            Authorization: `Bearer ${state.auth.user?.access_token}`,
          },
        }
      );
      return data;
    } catch (error) {
      return rejectWithValue(handleAxiosError(error));
    }
  }
);
