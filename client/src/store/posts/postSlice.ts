import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { getPost, getPosts } from "./postActions";
import { User } from "../auth/authSlice";

export interface Comment {
  id?: 4;
  content: string;
  media?: null;
  createdAt: string;
  updatedAt?: string;
  user: User;
}
export interface Post {
  id?: number;
  content: string;
  media: string | null;
  user: User;
  createdAt: string;
  updatedAt?: string;
  comments: Comment[];
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
    resetPosts: (state: State) => {
      state.posts = [];
      state.loading = false;
      state.error = "";
    },
  },
  extraReducers(builder) {
    builder
      // get all posts
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
      )
      // get one Post
      .addCase(getPost.pending, (state: State) => {
        state.loading = true;
      })
      .addCase(
        getPost.fulfilled,
        (state: State, action: PayloadAction<Post[]>) => {
          state.loading = false;
          state.posts = action.payload;
        }
      )
      .addCase(
        getPost.rejected,
        (state: State, action: PayloadAction<unknown>) => {
          state.loading = false;
          state.error = action.payload;
        }
      );
  },
});
export const { resetPosts } = postSlice.actions;
export default postSlice.reducer;
