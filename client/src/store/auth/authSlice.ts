import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { LoginAction, LogoutAction } from "./authActions";

export interface User {
  id: number;
  name: string;
  email: string;
  picture: string;
  providerId: string;
  createdAt: string;
  updatedAt: string;
  access_token: string;
}

interface State {
  user: User | null;
  error: unknown;
  loading: boolean;
}

const user: User = localStorage.getItem("user_data")
  ? JSON.parse(String(localStorage.getItem("user_data")))
  : null;

const initialState: State = {
  user: user,
  error: "",
  loading: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state: State) => {
      state.error = "";
      state.user = null;
      state.loading = false;
      LogoutAction();
    },
  },
  extraReducers(builder) {
    builder
      .addCase(LoginAction.pending, (state) => {
        state.loading = true;
      })
      .addCase(LoginAction.fulfilled, (state, action: PayloadAction<User>) => {
        state.loading = false;
        state.user = action.payload;
        state.error = "";
      })
      .addCase(
        LoginAction.rejected,
        (state, action: PayloadAction<unknown>) => {
          console.log(action);
          state.loading = false;
          state.error = action.payload;
        }
      );
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
