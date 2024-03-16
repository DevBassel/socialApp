import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { getMe } from "./userActions";

export interface User {
  id: number;
  name: string;
  email: string;
  picture: string;
  createdAt: string;
  updatedAt: string;
}

interface State {
  user: User | null;
  loading: boolean;
  erorr: unknown;
}

const user: User = localStorage.getItem("user-info")
  ? JSON.parse(String(localStorage.getItem("user-info")))
  : null;

const initialState: State = {
  user,
  loading: false,
  erorr: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    resetUser: (state: State) => {
      state.user = null;
      state.loading = false;
      state.erorr = "";
    },
    setUser: (state: State, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getMe.pending, (state: State) => {
        state.loading = true;
      })
      .addCase(
        getMe.fulfilled,
        (state: State, action: PayloadAction<User>) => {
          state.loading = false;
          state.user = action.payload;
        }
      )
      .addCase(
        getMe.rejected,
        (state: State, action: PayloadAction<unknown>) => {
          state.loading = false;
          state.erorr = action.payload;
        }
      );
  },
});
export const { resetUser, setUser } = userSlice.actions;
export default userSlice.reducer;
