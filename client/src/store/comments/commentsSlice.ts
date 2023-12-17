import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { User } from "../auth/authSlice";
import { createComment } from "./commentsActions";

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
  loading: boolean;
  error: unknown;
}
const initialState: State = {
  comment: [],
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
      state.error = "";
    },
  },
  extraReducers(builder) {
    builder
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
      );
  },
});
export const { resetComment } = commentsSlice.actions;
export default commentsSlice.reducer;
