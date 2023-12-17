import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { User } from "../auth/authSlice";
import { getFriends } from "./friendActions";

export interface Friend {
  id: 34;
  status: string;
  createdAt: string;
  sender: User;
  reciver: User;
}

interface State {
  friends: Friend[];
  loading: boolean;
  error: unknown;
}

const initialState: State = {
  friends: [],
  loading: false,
  error: "",
};

const friendSlice = createSlice({
  name: "friends",
  initialState,
  reducers: {
    resetFriends: (state: State) => {
      state.friends = [];
      state.loading = false;
      state.error = "";
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getFriends.pending, (state: State) => {
        state.loading = true;
      })
      .addCase(
        getFriends.fulfilled,
        (state: State, action: PayloadAction<Friend[]>) => {
          state.loading = false;
          state.friends = action.payload;
          state.error = "";
        }
      )
      .addCase(
        getFriends.rejected,
        (state: State, action: PayloadAction<unknown>) => {
          state.loading = false;
          state.error = action.payload;
        }
      );
  },
});

export const { resetFriends } = friendSlice.actions;
export default friendSlice.reducer;
