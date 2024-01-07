import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { getPost, getPosts, lovePost } from "./postActions";
import { Post, State } from "./post-interfaces";

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
      )
      .addCase(lovePost.pending, (state: State) => {
        state.loading = true;
      })
      .addCase(lovePost.fulfilled, (state: State) => {
        state.loading = false;
      })
      .addCase(lovePost.rejected, (state: State, actions) => {
        state.loading = false;
        state.error = actions.payload;
      });
  },
});
export const { resetPosts } = postSlice.actions;
export default postSlice.reducer;
