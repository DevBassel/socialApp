import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { getPosts } from "./postActions";
import { User } from "../auth/authSlice";

export interface Post {
  id?: number;
  content: string;
  media: string | null;
  user: User;
  createdAt: string;
  updatedAt?: string;
}

interface State {
  posts: Post[];
  loading: boolean;
  error: unknown;
}

const initialState: State = {
  posts: [],
  loading: false,
  error: "",
};

const postSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    resetPost: (state: State) => {
      state.posts = [];
      state.loading = false;
      state.error = "";
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getPosts.pending, (state: State) => {
        state.loading = true;
      })
      .addCase(
        getPosts.fulfilled,
        (state: State, action: PayloadAction<Post[]>) => {
          state.loading = false;
          state.posts = action.payload;
        }
      )
      .addCase(
        getPosts.rejected,
        (state: State, action: PayloadAction<unknown>) => {
          state.loading = false;
          state.error = action.payload;
        }
      );
  },
});

export default postSlice.reducer;
