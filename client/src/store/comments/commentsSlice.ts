import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { User } from "../auth/authSlice";
import { createComment, removeComment, updateComment } from "./commentsActions";

export interface Comment {
  id?: 4;
  content: string;
  media?: null;
  createdAt: string;
  updatedAt?: string;
  user: User;
}
interface State {
  comment: Comment[];
  msg: string;
  loading: boolean;
  error: unknown;
}
const initialState: State = {
  comment: [],
  msg: "",
  loading: false,
  error: "",
};
const commentsSlice = createSlice({
  name: "comments",
  initialState,
  reducers: {
    resetComment: (state: State) => {
      state.comment = [];
      state.loading = false;
      state.msg = "";
      state.error = "";
    },
  },
  extraReducers(builder) {
    builder
      // create
      .addCase(createComment.pending, (state: State) => {
        state.loading = true;
      })
      .addCase(
        createComment.fulfilled,
        (state: State, action: PayloadAction<Comment[]>) => {
          state.loading = false;
          state.comment = [...state.comment, ...action.payload];
          state.error = "";
        }
      )
      .addCase(
        createComment.rejected,
        (state: State, action: PayloadAction<unknown>) => {
          state.loading = false;
          state.comment = [];
          state.error = action.payload;
        }
      )
      // update
      .addCase(updateComment.pending, (state: State) => {
        state.loading = true;
      })
      .addCase(updateComment.fulfilled, (state: State) => {
        state.loading = false;
        state.error = "";
      })
      .addCase(
        updateComment.rejected,
        (state: State, action: PayloadAction<unknown>) => {
          state.loading = false;
          state.comment = [];
          state.error = action.payload;
        }
      )
      // remove
      .addCase(removeComment.pending, (state: State) => {
        state.loading = true;
      })
      .addCase(
        removeComment.fulfilled,
        (state: State, action: PayloadAction<string>) => {
          state.loading = false;
          state.msg = action.payload;
        }
      )
      .addCase(
        removeComment.rejected,
        (state: State, action: PayloadAction<unknown>) => {
          state.loading = false;
          state.error = action.payload;
        }
      );
  },
});
export const { resetComment } = commentsSlice.actions;
export default commentsSlice.reducer;
