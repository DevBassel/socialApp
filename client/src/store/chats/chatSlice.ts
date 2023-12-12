import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { getChats } from "./chatActions";
import { User } from "../auth/authSlice";

export interface Chat {
  id?: number;
  sender: User;
  reciever: User;
  createdAt?: string;
}
export interface State {
  chats: Chat[];
  loading: boolean;
  error: unknown;
}

const initialState: State = {
  chats: [],
  loading: false,
  error: "",
};

const chatSlice = createSlice({
  name: "chats",
  initialState,
  reducers: {
    resetChat: (state: State) => {
      state.chats = [];
      state.error = "";
      state.loading = false;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getChats.pending, (state: State) => {
        state.loading = true;
      })
      .addCase(
        getChats.fulfilled,
        (state: State, action: PayloadAction<Chat[]>) => {
          state.chats = action.payload;
          state.loading = false;
        }
      )
      .addCase(
        getChats.rejected,
        (state: State, action: PayloadAction<unknown>) => {
          state.error = action.payload;
          state.loading = false;
        }
      );
  },
});

export const { resetChat } = chatSlice.actions;
export default chatSlice.reducer;
